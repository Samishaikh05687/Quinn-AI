'use server'

import { client } from '@/lib/prisma'
import { extractEmailsFromString, extractURLfromString } from '@/lib/utils'
import { onRealTimeChat } from '../conversation'
import { clerkClient } from '@clerk/nextjs'
import { onMailer } from '../mailer'


import{CohereClientV2} from 'cohere-ai'



const cohere = new CohereClientV2({
  token: process.env.NEXT_PUBLIC_COHERE_API_KEY,
});

export const onStoreConversations = async (
  id: string,
  message: string,
  role: 'assistant' | 'user'
) => {
  await client.chatRoom.update({
    where: {
      id,
    },
    data: {
      message: {
        create: {
          message,
          role,
        },
      },
    },
  })
}

export const onGetCurrentChatBot = async (id: string) => {
  try {
    const chatbot = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        helpdesk: true,
        name: true,
        chatBot: {
          select: {
            id: true,
            welcomeMessage: true,
            icon: true,
            textColor: true,
            background: true,
            helpdesk: true,
          },
        },
      },
    })

    if (chatbot) {
      return chatbot
    }
  } catch (error) {
    console.log(error)
  }
}

let customerEmail: string | undefined

export const onAiChatBotAssistant = async (
  id: string,
  chat: { role: 'assistant' | 'user'; content: string }[],
  author: 'user',
  message: string
) => {
  try {
    const chatBotDomain = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        filterQuestions: {
          where: {
            answered: null,
          },
          select: {
            question: true,
          },
        },
      },
    })
    if (chatBotDomain) {
      const extractedEmail = extractEmailsFromString(message)
      if (extractedEmail) {
        customerEmail = extractedEmail[0]
      }

      if (customerEmail) {
        const checkCustomer = await client.domain.findUnique({
          where: {
            id,
          },
          select: {
            User: {
              select: {
                clerkId: true,
              },
            },
            name: true,
            customer: {
              where: {
                email: {
                  startsWith: customerEmail,
                },
              },
              select: {
                id: true,
                email: true,
                questions: true,
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                    mailed: true,
                  },
                },
              },
            },
          },
        })
        if (checkCustomer && !checkCustomer.customer.length) {
          const newCustomer = await client.domain.update({
            where: {
              id,
            },
            data: {
              customer: {
                create: {
                  email: customerEmail,
                  questions: {
                    create: chatBotDomain.filterQuestions,
                  },
                  chatRoom: {
                    create: {},
                  },
                },
              },
            },
          })
          if (newCustomer) {
            console.log('new customer made')
            const response = {
              role: 'assistant',
              content: `Welcome aboard ${
                customerEmail.split('@')[0]
              }! I'm glad to connect with you. Is there anything you need help with?`,
            }
            return { response }
          }
        }
        if (checkCustomer && checkCustomer.customer[0].chatRoom[0].live) {
          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            message,
            author
          )
          
          onRealTimeChat(
            checkCustomer.customer[0].chatRoom[0].id,
            message,
            'user',
            author
          )

          if (!checkCustomer.customer[0].chatRoom[0].mailed) {
            const user = await clerkClient.users.getUser(
              checkCustomer.User?.clerkId!
            )

            onMailer(user.emailAddresses[0].emailAddress)

            //update mail status to prevent spamming
            const mailed = await client.chatRoom.update({
              where: {
                id: checkCustomer.customer[0].chatRoom[0].id,
              },
              data: {
                mailed: true,
              },
            })

            if (mailed) {
              return {
                live: true,
                chatRoom: checkCustomer.customer[0].chatRoom[0].id,
              }
            }
          }
          return {
            live: true,
            chatRoom: checkCustomer.customer[0].chatRoom[0].id,
          }
        }

        await onStoreConversations(
          checkCustomer?.customer[0].chatRoom[0].id!,
          message,
          author
        )

        const chatCompletion = await cohere.chat({
          model: 'command-r-plus',
          messages: [
            {
              role: 'assistant',
              content: `
              You will get an array of questions that you must ask the customer. 
              
              Progress the conversation using those questions. 
              
              Whenever you ask a question from the array i need you to add a keyword at the end of the question (complete) this keyword is extremely important. 
              
              Do not forget it.

              only add this keyword when your asking a question from the array of questions. No other question satisfies this condition

              Always maintain character and stay respectfull.

              The array of questions : [${chatBotDomain.filterQuestions
                .map((questions) => questions.question)
                .join(', ')}]

              if the customer says something out of context or inapporpriate. Simply say this is beyond you and you will get a real user to continue the conversation. And add a keyword (realtime) at the end.

              if the customer agrees to book an appointment send them this link http://localhost:3000/portal/${id}/appointment/${
                checkCustomer?.customer[0].id
              }

              if the customer wants to buy a product redirect them to the payment page http://localhost:3000/portal/${id}/payment/${
                checkCustomer?.customer[0].id
              }
          `,
            },
            ...chat,
            {
              role: 'user',
              content: message,
            },
          ],
          

        })
        const content = chatCompletion.message?.content?.[0]?.text;
        if (content?.includes('(realtime)')) {
           const realtime = await client.chatRoom.update({
            where: {
              id: checkCustomer?.customer[0].chatRoom[0].id,
            },
            data: {
              live: true,
            },
          })
          
            if (realtime) {
             
         if (chatCompletion?.message?.content && Array.isArray(chatCompletion.message.content)) {
     
         const combinedContent = chatCompletion.message.content.map((textObj) => textObj.text).join(' ');

                const response = {
                  role: 'assistant',
                  content: combinedContent.replace('(realtime)', ''

                  ),
                };
                await onStoreConversations(
                  checkCustomer?.customer[0].chatRoom[0].id!,
                  response.content,
                  'assistant'
                )
        
                return { response }
              } 
            }
          }
          
          
        if (chat[chat.length - 1].content.includes('(complete)')) {
          const firstUnansweredQuestion =
            await client.customerResponses.findFirst({
              where: {
                customerId: checkCustomer?.customer[0].id,
                answered: null,
              },
              select: {
                id: true,
              },
              orderBy: {
                question: 'asc',
              },
            })
          if (firstUnansweredQuestion) {
            await client.customerResponses.update({
              where: {
                id: firstUnansweredQuestion.id,
              },
              data: {
                answered: message,
              },
            })
          }
        }

        if (chatCompletion?.message?.content && Array.isArray(chatCompletion.message.content)) {
          // Combine content into a single string
          const combinedContent = chatCompletion.message.content.map((textObj) => textObj.text).join(' ');
        
          // Extract URL from the combined content
          const generatedLink = extractURLfromString(combinedContent);
        
          if (generatedLink && generatedLink.length > 0) {
            const link = generatedLink[0];
        
            const response = {
              role: 'assistant',
              content: `Great! You can follow the link to proceed`,
              link: link.slice(0, -1), // Remove the last character if necessary
            };
        
            // Store conversation with assistant response
            await onStoreConversations(
              checkCustomer?.customer[0].chatRoom[0].id!,
              `${response.content} ${response.link}`,
              'assistant'
            );
        
            return { response };
          }
        
          const response = {
            role: 'assistant',
            content: combinedContent,
          };
        
          // Store conversation without link
          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            `${response.content}`,
            'assistant'
          );
        
          return { response };
        } else {
          throw new Error('chatCompletion.message.content is undefined or not an array');
        }
        
      }
      console.log('No customer')
      const chatCompletion = await cohere.chat({
        model: 'command-r-plus',
        messages: [
          {
            role: 'assistant',
            content: `
                 You are a highly knowledgeable, empathetic, and experienced sales representative for ${chatBotDomain.name}, an indian company that provides a valuable product or service of skin care items . Your primary objective is to engage in a natural, human-like conversation with the customer, understanding their unique needs, answering their questions under 200 words , and offering tailored solutions.
                 Start by warmly welcoming the customer on behalf of ${chatBotDomain.name}, ensuring they feel valued and comfortable. Guide the conversation naturally while maintaining a respectful and professional tone, building trust and rapport.
                 Your immediate task is to guide the conversation towards obtaining the customer's email address in a subtle and respectful manner. If the customer has not provided sufficient information, politely redirect them to the appropriate resource or link. Always remain in character, focusing on delivering an exceptional customer experience.
             `,
          },
          ...chat,
          {
            role: 'user',
            content: message,
          },
        ],
      });
      if (chatCompletion.message?.content && chatCompletion.message.content[0]?.text) {
        const response = {
          role: 'assistant',
          content: chatCompletion.message?.content?.[0].text,
        };
        // console.log('Assistant Message:', response);
        return { response }
      } else {
        console.error('Error: chatCompletion message or content is undefined.');
      }
     
    }
  } catch (error) {
    console.log(error)
  }
}