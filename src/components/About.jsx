import React from 'react';
import { motion } from 'framer-motion';

export default function About({ projectCount, eduCount, profile }) {
  return (
    <section id="about" className="min-h-screen w-full px-4 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center items-center pt-16">
      <div className="w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-white">{profile?.aboutHeading || "About Me"}</h2>
          <div className="h-1 w-20 bg-[#2563EB] mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gray-400 leading-relaxed text-base sm:text-lg content-text space-y-4 whitespace-pre-wrap"
          >
            {profile?.aboutText || "I have completed my college and currently equipped with hands-on knowledge of Python, SQL, NumPy, Pandas, and Business Intelligence tools.\n\nI am passionate about data analysis and extracting meaningful insights from data to solve real-world problems.\n\nI continuously work on improving my analytical and technical skills in the field of Data Science."}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.2 }}
            className="grid grid-cols-2 gap-4 sm:gap-6"
          >
            <motion.div 
              whileHover={{ scale: 1.05, translateY: -5 }}
              className="p-6 bg-gray-800 rounded-xl text-center border border-gray-700 card-bg shadow-lg transition-colors hover:border-[#2563EB]"
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-[#22C55E] mb-2">{projectCount}+</h3>
              <p className="text-sm sm:text-base font-medium text-gray-300">Projects Completed</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, translateY: -5 }}
              className="p-6 bg-gray-800 rounded-xl text-center border border-gray-700 card-bg shadow-lg transition-colors hover:border-[#2563EB]"
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-[#22C55E] mb-2">{eduCount}</h3>
              <p className="text-sm sm:text-base font-medium text-gray-300">Education & Credentials</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}