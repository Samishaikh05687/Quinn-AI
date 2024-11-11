import React from 'react';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/navbar';

const ContactPage = () => {
  return (
    <>
    <NavBar/>
    <div className="flex flex-col items-center py-10 bg-gray-50 min-h-screen">
      <h2 className="text-5xl font-bold text-gray-800 mb-4 text-center drop-shadow-lg">
        Get in Touch with Us
      </h2>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-lg">
        We’d love to hear from you! Whether you have a question, feedback, or just want to chat, feel free to reach out. Our team is here to assist you.
      </p>
      <form className="flex flex-col gap-4 w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
        <input
          type="text"
          placeholder="Full Name"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition-all duration-300 transform hover:scale-105"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition-all duration-300 transform hover:scale-105"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition-all duration-300 transform hover:scale-105"
        />
        <select className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition-all duration-300 transform hover:scale-105">
          <option value="" disabled selected>Select Inquiry Type</option>
          <option value="general">General Inquiry</option>
          <option value="support">Support</option>
          <option value="feedback">Feedback</option>
          <option value="other">Other</option>
        </select>
        <textarea
          placeholder="Your Message"
          className="p-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:border-orange-500 transition-all duration-300 transform hover:scale-105"
        ></textarea>
        <Button className="bg-orange text-white py-3 rounded-md w-full transition duration-300 hover:bg-orange-dark">
          Send Message
        </Button>
      </form>
    </div>
    </>
  );
};

export default ContactPage;
