// components/Hero.jsx

import React from 'react';
import { motion } from 'framer-motion';
import flagOverlayImage from '../assets/american_flag_background.png';

const Hero = ({ id, scrollToSection }) => {
  return (
    <section
      id={id}
      className="relative bg-gradient-to-r from-gray-100 to-gray-200 text-center py-24 px-6 lg:py-32 overflow-hidden"
    >
      {/* Subtle flag background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
        style={{ backgroundImage: `url(${flagOverlayImage})` }}
        aria-hidden="true"
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block bg-blue-100 text-raven-blue text-sm font-semibold px-3 py-1 rounded-full mb-4 shadow-sm"
        >
          Proudly Veteran-Owned & Operated
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-raven-dark mb-4 leading-tight"
        >
          US-Based Tech Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto"
        >
          Providing freedom to eliminate inefficiencies and drive growth. DevOps, cloud, analytics dashboards, and custom software—delivered with discipline and transparency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.36 }}
          className="mt-6 text-gray-500 text-sm"
        >
          Serving federal, enterprise, and defense clients nationwide.
        </motion.div>
        <div className="mt-8">
          <button
            onClick={() => scrollToSection && scrollToSection('services')}
            className="text-sm text-gray-600 hover:text-raven-blue underline"
          >
            Explore our services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

