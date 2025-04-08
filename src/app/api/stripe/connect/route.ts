import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: '2024-09-30.acacia',
})

export async function GET() {
  try {
    // 1. Verify environment
    if (!process.env.STRIPE_SECRET) {
      throw new Error('Stripe secret key not configured')
    }

    // 2. Authenticate user
    const user = await currentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    // 3. Create Stripe account
    const account = await stripe.accounts.create({
      country: 'US',
      type: 'custom',
      business_type: 'company',
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true }
      }
    })

    // 4. Update business details (simplified - use real user data)
    await stripe.accounts.update(account.id, {
      business_profile: {
        mcc: '5045',
        url: process.env.NEXT_PUBLIC_SITE_URL,
      },
      company: {
        name: user.firstName ? `${user.firstName}'s Business` : "User Business",
        phone: user.phoneNumbers[0]?.phoneNumber || '+15555555555'
      }
    })

    // 5. Create account owner (simplified)
    await stripe.accounts.createPerson(account.id, {
      first_name: user.firstName || "User",
      last_name: user.lastName || "Account",
      email: user.emailAddresses[0]?.emailAddress,
      relationship: { owner: true }
    })

    // 6. Save to database
    await client.user.update({
      where: { clerkId: user.id },
      data: { stripeId: account.id }
    })

    // 7. Create onboarding link
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_SITE_URL}/stripe/refresh`,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/stripe/success`,
      type: 'account_onboarding'
    })

    return NextResponse.json({ url: accountLink.url })

  } catch (error) {
    console.error('Stripe Connect Error:', error)
    return NextResponse.json(
      { error: 'Failed to create Stripe account' },
      { status: 500 }
    )
  }
}