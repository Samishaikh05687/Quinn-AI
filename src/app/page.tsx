'use client'
import NavBar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { pricingCards } from '@/constants/landing-page'
import clsx from 'clsx'
import { ArrowRightCircleIcon, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser'
import NewsRoomPage from './newspage/page'
import { motion } from 'framer-motion'

export default async function Home() {
  return (
    <main>
      <NavBar />
      <section>
        <div className="flex items-center justify-center flex-col mt-[80px] gap-6">
          <motion.span
            className="text-orange bg-orange/20 px-4 py-2 rounded-full text-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            An AI powered sales assistant chatbot
          </motion.span>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/images/quin_ai_logo.png"
              width={1000}
              height={300}
              alt="Logo"
              className="max-w-2xl ml-30 pl-7 object-contain"
            />
          </motion.div>
          <motion.p
            className="text-center text-xl max-w-[550px] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Your AI powered sales assistant! Embed Quinn AI into any website
            with just a snippet of code!
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button className="bg-orange font-bold text-white px-4 py-2 rounded-full shadow-lg">
              <Link href="/dashboard">
                Start For Free <ArrowRightCircleIcon className="ml-2 inline-block" />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Image
              src="/images/iphonecorinna.png"
              width={400}
              height={100}
              alt="Logo"
              className="max-w-lg object-contain"
            />
          </motion.div>
        </div>
      </section>
     
      
      <section className="flex justify-center items-center flex-col gap-4 mt-20">
      <h2 className="text-4xl text-center font-semibold">
        Choose what fits you right
      </h2>
      <p className="text-muted-foreground text-center max-w-lg text-lg">
        Our straightforward pricing plans are tailored to meet your needs. If
        you&#39;re not ready to commit, you can get started for free.
      </p>

      <div className="flex justify-center gap-6 mt-10 mb-10">
        {pricingCards.map((card, index) => {
          // Define scale and rotation for 3D effect
          const isMiddleCard = index === Math.floor(pricingCards.length / 2);
          const scale = isMiddleCard ? 1.2 : 0.9;
          const zIndex = isMiddleCard ? 10 : 5;
          const rotation = isMiddleCard ? 0 : index < Math.floor(pricingCards.length / 2) ? -5 : 5;

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)' }}
              style={{ zIndex, transform: `rotateY(${rotation}deg) scale(${scale})` }}
              className="transition-transform"
            >
              <Card
                className={clsx(
                  'w-[300px] flex flex-col m-3 pb-3 justify-between transform-gpu',
                  {
                    'border-2 border-primary': card.title === 'Unlimited',
                  }
                )}
              >
                <CardHeader>
                  <CardTitle className="text-orange">{card.title}</CardTitle>
                  <CardDescription>
                    {pricingCards.find((c) => c.title === card.title)?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.span className="text-4xl font-bold">
                    {card.price}
                  </motion.span>
                  <span className="text-muted-foreground">
                    <span>/ month</span>
                  </span>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <div>
                    {card.features.map((feature) => (
                      <div key={feature} className="flex gap-2">
                        <Check />
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Link
                      href={`/dashboard?plan=${card.title}`}
                      className="bg-[#eda94f] border-orange border-2 p-2 w-full text-center font-bold rounded-md"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
    </main>
  )
}
