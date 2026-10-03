import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero_bg.jfif';

const Hero = () => {
  // Stagger container for text elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time delay between each element
        delayChildren: 0.2,
      },
    },
  };

  // Upward entrance variant for text items
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1], // Smooth cubic-bezier curve
      },
    },
  };

  return (
    <section className="h-100 md:h-screen px-6 my-6 mx-auto max-w-7xl">
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative h-full w-full px-6 flex items-center justify-center text-center rounded-2xl overflow-hidden shadow-sm"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        {/* Hero Content with Staggered Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-2xl text-white flex flex-col items-center"
        >
          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-2xl md:text-5xl font-bold tracking-wider mb-4 uppercase"
          >
            Wear Your Confidence
          </motion.h1>

          {/* Description Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base mb-8 max-w-lg leading-relaxed font-light"
          >
            Modern and stylish fashion store website design with a clean layout and elegant product showcase. Perfect for clothing brands, boutiques, and online fashion shops.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/shop"
                className="bg-accent text-text-primary font-medium px-8 py-3 rounded-full hover:bg-accent/90 transition-all shadow-md block text-center border-border-color"
              >
                Shop Now
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/shop"
                className="border border-white text-white font-medium px-8 py-3 rounded-full hover:bg-white/10 transition-all block text-center text-sm"
              >
                Explore Collection
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

