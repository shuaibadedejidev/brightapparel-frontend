import React from 'react';
import { Truck, Headphones, RotateCcw, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const featureList = [
    {
      icon: <Truck size={28} className="text-gray-600" />,
      title: 'Free Shipping',
      description: 'Step into the realm of style with our unbeatable t-shirt trendsetter of today.',
    },
    {
      icon: <Headphones size={28} className="text-gray-600" />,
      title: '24/7 Support',
      description: 'Step into the realm of style with our unbeatable t-shirt trendsetter of today.',
    },
    {
      icon: <RotateCcw size={28} className="text-gray-600" />,
      title: 'Easy Returns',
      description: 'Step into the realm of style with our unbeatable t-shirt trendsetter of today.',
    },
    {
      icon: <Lock size={28} className="text-[#6c5d53]" />,
      title: 'Secure Checkout',
      description: 'Step into the realm of style with our unbeatable t-shirt trendsetter of today.',
    },
  ];

  // Container variants to control child stagger delay
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Individual card pop-up animation
  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="w-full bg-[#f4f1eb] py-5 px-6 border-t border-[#e2ddd5]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
      >
        {featureList.map((feature, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="flex flex-col items-center cursor-default"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="mb-2 p-3 rounded-full bg-bg-subtle flex items-center justify-center"
            >
              {feature.icon}
            </motion.div>
            <h3 className="text-base font-semibold text-[#4a3b32] mb-2">
              {feature.title}
            </h3>
            <p className="text-xs text-[#6c5d53] leading-relaxed max-w-xs">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;