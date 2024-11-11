"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import NavBar from '@/components/navbar'

// Define the type for the features array
type Feature = {
  name: string
  icon: string
  description: string
}

const features: Feature[] = [
  { name: "Automated AI sales rep (AI chatbot)", icon: "🤖", description: "An AI-powered chatbot to handle customer inquiries and support with ease." },
  { name: "Books appointments and processes payments", icon: "📅", description: "Effortlessly manage appointments and payments with automated scheduling and billing." },
  { name: "Usable on any website with a simple code", icon: "💻", description: "Easily integrate with your website using minimal code, compatible across platforms." },
  { name: "Smart question linking", icon: "🧠", description: "Link common questions and relevant answers to streamline customer interactions." },
  { name: "Real-time chat (manual/automated)", icon: "💬", description: "Engage with users in real-time, offering both manual and automated support options." },
  { name: "White-labeling options", icon: "🏷️", description: "Personalize the AI chatbot’s interface to match your brand's look and feel." },
  { name: "Customizable interface", icon: "🎨", description: "Tailor the chatbot’s appearance and functionality to suit your specific needs." },
  { name: "Calendar widget for bookings", icon: "🗓️", description: "Allow users to book appointments using an intuitive calendar widget." },
  { name: "Integrates with Stripe for payments", icon: "💳", description: "Securely process payments through Stripe integration with ease." },
  { name: "Simple email marketing", icon: "✉️", description: "Reach out to leads and customers effortlessly through built-in email marketing tools." },
  { name: "Financial dashboard", icon: "💰", description: "Track revenue and key metrics with a comprehensive financial dashboard." },
  { name: "Save visitor info as leads", icon: "💾", description: "Collect and manage visitor data to generate leads and track engagement." },
  { name: "Custom login/signup with OTP", icon: "🔐", description: "Enhance security with OTP-based login and signup for user verification." },
  { name: "Secure file/image uploads", icon: "📲", description: "Allow users to securely upload files and images for seamless interaction." },
  { name: "SEO optimized blogging", icon: "🔍", description: "Increase visibility with SEO-friendly content on your website’s blog." },
  { name: "Improved architecture", icon: "🏗️", description: "Built with scalability and performance in mind to handle large user bases." },
  { name: "Minimal, stunning UI", icon: "🖥️", description: "Enjoy a sleek and modern UI design that enhances user experience." },
  { name: "FAQ section", icon: "❓", description: "Answer common questions with an easy-to-navigate FAQ section." },
  { name: "Light/dark mode toggle", icon: "🌓", description: "Switch between light and dark themes to match user preferences." },
  { name: "Feature control settings", icon: "⚙️", description: "Enable or restrict features based on user plan or preferences." },
  { name: "Restrict features by plan", icon: "🔒", description: "Control feature availability based on subscription plans for better user management." },
]

const FeaturesPage = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null)

  const toggleFeature = (index: number) => {
    setActiveFeature(activeFeature === index ? null : index)
  }

  return (
    <>
    <NavBar/>
    <div className="px-8 py-12 bg-orange-50 min-h-screen">
      <header className="text-center mb-10">
      <h2 className="text-5xl font-bold text-gray-800 pb-2"> Explore Our Features</h2>
        
        <p className="text-lg text-orange-800 max-w-2xl mx-auto">
          Discover a range of powerful features designed to enhance customer engagement, streamline interactions, and provide a seamless user experience. Unlock the full potential of our AI-powered platform!
        </p>
      </header>
      
      <div className="max-w-3xl mx-auto">
        {features.map((feature, index: number) => (
          <div 
            key={index} 
            className={`border-b border-orange-200 transition-all duration-300 ${activeFeature === index ? "bg-orange-100" : "bg-white"} rounded-lg mb-4 shadow-md`}
          >
            <div 
              className="flex items-center justify-between p-5 cursor-pointer hover:bg-orange-50 transition-all duration-200" 
              onClick={() => toggleFeature(index)}
            >
              <div className="flex items-center gap-4 text-lg font-semibold text-orange-700">
                <span className="text-2xl">{feature.icon}</span>
                <span>{feature.name}</span>
              </div>
              <div className={`transition-transform ${activeFeature === index ? 'rotate-180' : ''}`}>
                {activeFeature === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </div>
            {activeFeature === index && (
              <div className="p-5 text-orange-900 bg-white rounded-b-lg border-t border-orange-100 animate-slide-down">
                <p>{feature.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default FeaturesPage
