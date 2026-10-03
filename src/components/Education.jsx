import React from 'react';
import { motion } from 'framer-motion';

export default function Education({ educations, isAdminLoggedIn, setIsEduModalOpen, handleDeleteEducation }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="education-section" className="min-h-screen w-full px-4 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center items-center pt-16">
      <div className="w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-white">Education & Credentials</h2>
          <div className="h-1 w-20 bg-[#2563EB] mx-auto rounded-full mb-4"></div>
          {isAdminLoggedIn && (
            <button onClick={() => setIsEduModalOpen(true)} className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg inline-flex items-center gap-2 mt-2 hover:scale-105 transition-transform">
              <i className="fas fa-plus text-xs"></i> Add Education
            </button>
          )}
        </motion.div>
        
        {educations.length === 0 ? (
          <p className="text-center text-gray-400 mb-12">No education details added yet.</p>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {educations.map((edu, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.2)" }}
                className="relative bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 sm:p-8 shadow-2xl transition-all duration-300 hover:border-[#2563EB]/50 group"
              >
                {isAdminLoggedIn && (
                  <button onClick={() => handleDeleteEducation(edu._id)} className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" title="Delete">
                    <i className="fas fa-trash text-xs"></i>
                  </button>
                )}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 sm:p-4 bg-blue-600/10 text-[#2563EB] rounded-xl text-xl sm:text-2xl transition-colors duration-300 group-hover:bg-[#2563EB] group-hover:text-white shadow-inner">
                    <i className={edu.category === 'Academic Background' ? 'fas fa-graduation-cap' : 'fas fa-scroll'}></i>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#2563EB] transition-colors">{edu.category}</h3>
                    {edu.year && <span className="text-xs bg-[#2563EB]/20 text-blue-300 px-3 py-1 rounded-full font-semibold inline-block mt-1">{edu.year}</span>}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-200">{edu.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{edu.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}