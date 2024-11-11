import NavBar from '@/components/navbar';
import React from 'react';

type BlogPost = {
  title: string;
  date: string;
  description: string;
  imageUrl: string;
};

const blogPosts: BlogPost[] = [
  {
    title: "How AI is Revolutionizing Customer Experience",
    date: "November 1, 2024",
    description: "Discover how AI technology is transforming customer service by providing personalized, efficient, and proactive support.",
    imageUrl: "/images/blog-post-2.jpg",
  },
  {
    title: "The Future of Machine Learning in Business",
    date: "October 20, 2024",
    description: "A look into machine learning’s role in business, from predictive analytics to intelligent automation.",
    imageUrl: "/images//blog-post-3.jpg",
  },
  {
    title: "Top 5 AI Trends to Watch in 2024",
    date: "October 5, 2024",
    description: "From ethical AI to edge computing, we explore the trends that will shape AI in the coming years.",
    imageUrl: "/images//blog-posts.jpg",
  },
  {
    title: "Optimizing Business Operations with AI Tools",
    date: "September 25, 2024",
    description: "Learn how AI-powered tools can streamline workflows, improve decision-making, and boost productivity.",
    imageUrl:"/images//blog-post-2.jpg",
  },
];

const NewsRoomPage = () => {
  return (
    <>
    <NavBar/>
    
    <div className="px-6 py-12 bg-gray-50 min-h-screen">
      <header className="text-center mb-10">
      <h2 className="text-5xl font-bold text-gray-800 pb-2">News Room</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Explore our insights on AI, technology, and optimizing your business.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-orange-700 mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{post.date}</p>
              <p className="text-gray-700">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default NewsRoomPage;
