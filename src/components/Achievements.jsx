import React from 'react';
import { motion } from 'framer-motion';

export default function Achievements({ achievements, isAdminLoggedIn, setIsAchievementModalOpen, handleDeleteAchievement }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="achievements" className="min-h-screen w-full px-4 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center items-center pt-16">
      <div className="w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-white">Achievements & Certifications</h2>
          <div className="h-1 w-20 bg-[#2563EB] mx-auto rounded-full mb-4"></div>
          {isAdminLoggedIn && (
            <button onClick={() => setIsAchievementModalOpen(true)} className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg inline-flex items-center gap-2 mt-2 hover:scale-105 transition-transform">
              <i className="fas fa-plus text-xs"></i> Add Achievement
            </button>
          )}
        </motion.div>
        
        {(!achievements || achievements.length === 0) ? (
          <p className="text-center text-gray-400 mb-12">No achievements added yet.</p>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {achievements.map((item, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)" }}
                className="relative bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-[#2563EB]/50 group flex flex-col h-full"
              >
                {isAdminLoggedIn && (
                  <button onClick={() => handleDeleteAchievement(item._id)} className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" title="Delete">
                    <i className="fas fa-trash text-xs"></i>
                  </button>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gray-900 rounded-xl shadow-inner">
                    <i className={`${item.icon} text-2xl`}></i>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{item.category}</span>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#2563EB] transition-colors leading-snug">{item.title}</h3>
                <p className="text-sm text-gray-400 font-semibold mb-3">{item.issuer}</p>
                <p className="text-gray-400 text-sm leading-relaxed mt-auto">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
