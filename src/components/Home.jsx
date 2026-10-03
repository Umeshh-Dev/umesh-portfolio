import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Home({ profile, isAdminLoggedIn, setIsProfileModalOpen }) {

  return (
    <section id="home" className="min-h-screen w-full flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-24 pb-12 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="flex flex-col items-center justify-center w-full max-w-4xl text-center relative">
        {isAdminLoggedIn && (
          <button onClick={() => setIsProfileModalOpen(true)} className="absolute -top-12 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg transition-transform hover:scale-105 z-10">
            <i className="fas fa-edit mr-2"></i> Edit Profile Info
          </button>
        )}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-36 h-36 sm:w-48 sm:h-48 rounded-full mb-6 lg:mb-8 border-4 border-[#2563EB] overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center bg-white"
        >
          <img src={profile?.profileImage || "/Profile Picture.jpeg"} alt={profile?.name || "Profile"} className="min-w-[155%] min-h-[155%] object-cover" style={{ objectPosition: 'center 20%' }} />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4"
        >
          Hi, I'm <span className="text-[#2563EB]">{profile?.name?.split(' ')[0] || "Umesh"} {profile?.name?.split(' ').slice(1).join(' ') || "Thakur"}</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-xl text-gray-400 mb-8 max-w-2xl hero-subtext"
        >
          {profile?.tagline || "Transforming raw data into intelligent insights using Python, SQL, and AI."}
        </motion.p>
        
        <motion.a 
          href="#projects" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#2563EB] hover:bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-colors shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:shadow-[0_0_25px_rgba(37,99,235,0.8)]"
        >
          View My Work
        </motion.a>
      </div>
    </section>
  );
}