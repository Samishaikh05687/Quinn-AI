import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { ArrowRightCircleIcon, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { pricingCards } from '@/constants/landing-page';
import NavBar from '@/components/navbar';

const PricingPage = () => {
  return (
    <>
    <NavBar/>
    
    <div className="py-10 px-8 bg-gray-50">
      {/* Pricing Header Section */}
      <div className="text-center mb-10">
        <h2 className="text-5xl font-bold text-gray-800">Choose Your Perfect Plan</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          Our pricing plans are designed to fit your needs, whether you&#39;re just getting started or looking for advanced features. Select a plan that suits you best and get started on your journey with us!
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="flex justify-center gap-4 flex-wrap mt-6">
        {pricingCards.map((card) => (
          <Card
            key={card.title}
            className={clsx('w-[300px] flex flex-col justify-between shadow-lg transition-transform duration-300 transform hover:scale-105', {
              'border-2 border-primary': card.title === 'Unlimited',
            })}
          >
            <CardHeader>
              <CardTitle className="text-orange-500">{card.title}</CardTitle>
              <CardDescription>
                {pricingCards.find((c) => c.title === card.title)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">{card.price}</span>
              <span className="text-muted-foreground">
                <span>/month</span>
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
              <Link
                href={`/dashboard?plan=${card.title}`}
                className="bg-[#f3d299] border-orange border-2 p-2 w-full text-center font-bold rounded-md transition-colors duration-300 hover:bg-orange-400"
              >
                Get Started
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
    </>
  );
}

export default PricingPage;
