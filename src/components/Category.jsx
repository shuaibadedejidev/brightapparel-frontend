import React from 'react';
import { Link } from 'react-router';
import {ArrowRightIcon} from 'lucide-react'
import menCloth from '../assets/men-cloth.jfif'
import womenCloth from '../assets/women-cloth.jfif'
import unisex from '../assets/unisex.jfif'
import kids from '../assets/kids.jfif'

const Categories = () => {
  // Category data mapping to the 4 cards shown in your design
  const categoryList = [
    {
      id: 'women',
      title: 'Women',
      image: womenCloth, // Replace with your image asset
      path: '/shop?category=women',
    },
    {
      id: 'men',
      title: 'Men',
      image: menCloth,
      path: '/shop?category=men',
    },
    {
      id: 'unisex',
      title: 'Casual / Chic',
      image: unisex,
      path: '/shop?category=chic',
    },
    {
      id: 'kids',
      title: 'Kids',
      image: kids,
      path: '/shop?category=kids',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#4a3b32] mb-3 font-serif">
          Categories
        </h2>
        <p className="text-xs md:text-sm text-[#6c5d53] leading-relaxed">
          Perfect for clothing brands, boutiques, and online fashion shops.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryList.map((cat) => (
          <Link 
            key={cat.id}
            to={cat.path}
            className="group relative h-[380px] rounded-2xl overflow-hidden bg-[#e9e4dc] flex items-end p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1"
          >
            {/* Background Image with smooth zoom on hover */}
            <img 
              src={cat.image} 
              alt={cat.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Subtle Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent"></div>

            {/* Category Label */}
            <div className="relative z-10 w-full flex items-center justify-between text-white">
              <span className="text-lg font-medium tracking-wide">{cat.title}</span>
              <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm group-hover:bg-white group-hover:text-black transition-colors">
                <ArrowRightIcon />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;