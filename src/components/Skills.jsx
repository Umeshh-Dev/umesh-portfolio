import React from 'react';
import { motion } from 'framer-motion';

export default function Skills({ defaultSkills, customSkills, isAdminLoggedIn, setIsSkillModalOpen, handleDeleteDefaultSkill, handleDeleteCustomSkill }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <section id="skills" className="min-h-screen w-full bg-gray-800/50 skills-bg px-4 sm:px-6 flex flex-col justify-center items-center pt-16">
      <div className="max-w-6xl w-full text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-white">My Skills</h2>
          <div className="h-1 w-20 bg-[#2563EB] mx-auto rounded-full mb-4"></div>
          {isAdminLoggedIn && (
            <button onClick={() => setIsSkillModalOpen(true)} className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg inline-flex items-center gap-2 mb-6 hover:scale-105 transition-transform">
              <i className="fas fa-plus text-xs"></i> Add Skill
            </button>
          )}
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto"
        >
          {defaultSkills.map((skill, index) => (
            <motion.div 
              key={`default-${index}`} 
              variants={badgeVariants}
              whileHover={{ scale: 1.1, backgroundColor: "#2563EB", borderColor: "#2563EB", color: "#fff" }}
              className="skill-badge inline-flex items-center gap-2 cursor-default font-medium text-sm sm:text-base shadow-sm"
            >
              <span>{skill}</span>
              {isAdminLoggedIn && (
                <button onClick={() => handleDeleteDefaultSkill(index)} className="text-red-400 hover:text-white ml-1 p-0.5 transition cursor-pointer" title="Delete">
                  <i className="fas fa-times text-xs"></i>
                </button>
              )}
            </motion.div>
          ))}
          {customSkills.map((skill, index) => (
            <motion.div 
              key={`custom-${index}`} 
              variants={badgeVariants}
              whileHover={{ scale: 1.1, backgroundColor: "#2563EB", borderColor: "#2563EB", color: "#fff" }}
              className="skill-badge inline-flex items-center gap-2 cursor-default font-medium text-sm sm:text-base shadow-sm"
            >
              <span>{skill.name}</span>
              {isAdminLoggedIn && (
                <button onClick={() => handleDeleteCustomSkill(skill._id)} className="text-red-400 hover:text-white ml-1 p-0.5 transition cursor-pointer" title="Delete">
                  <i className="fas fa-times text-xs"></i>
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}