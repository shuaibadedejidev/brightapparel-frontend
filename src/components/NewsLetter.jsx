import React, { useState } from 'react';
import newletterimage from '../assets/newletterimage.jfif'
const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log('Subscribed with:', email);
    setEmail('');
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="bg-[#f4f1eb] rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-12 relative">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8">
          <img 
            src={newletterimage} 
            alt="Join Our Style List" 
            className="w-full h-[280px] object-cover rounded-xl"
          />
        </div>

        {/* Right Content / Form Section */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
          <span className="text-[10px] uppercase tracking-widest text-[#6c5d53] font-semibold mb-2">
            Get 10% Off Your First Order
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#4a3b32] mb-3">
            Join Our Style List
          </h2>
          <p className="text-xs md:text-sm text-[#6c5d53] mb-6 leading-relaxed">
            Sign up for exclusive offers, new arrivals, and style inspiration.
          </p>

          <form onSubmit={handleSubmit} className="w-full flex items-center gap-2 max-w-md">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white px-4 py-3 text-xs rounded-lg border border-[#e2ddd5] focus:outline-none focus:border-[#4a3b32]"
            />
            <button 
              type="submit"
              className="bg-[#1a1a1a] text-white text-xs font-medium px-6 py-3 rounded-lg hover:bg-black transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;