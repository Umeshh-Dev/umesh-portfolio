import React from 'react';
import { motion } from 'framer-motion';

export default function Projects({ projects, isAdminLoggedIn, setIsAddModalOpen, handleDeleteProject }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="projects" className="min-h-screen w-full px-4 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center items-center pt-16">
      <div className="w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-white">Projects</h2>
          <div className="h-1 w-20 bg-[#2563EB] mx-auto rounded-full mb-4"></div>
          {isAdminLoggedIn && (
            <button onClick={() => setIsAddModalOpen(true)} className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg inline-flex items-center gap-2 hover:scale-105 transition-transform">
              <i className="fas fa-plus text-xs"></i> Add Project
            </button>
          )}
        </motion.div>
        
        {projects.length === 0 ? (
          <p className="text-center text-gray-400 mb-12">No projects added yet.</p>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {projects.map((proj, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)", borderColor: "#2563EB" }}
                className="relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl flex flex-col justify-between transition-colors duration-300"
              >
                {isAdminLoggedIn && (
                  <button onClick={() => handleDeleteProject(proj._id)} className="absolute top-3 right-3 z-10 bg-red-600 hover:bg-red-700 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110" title="Delete">
                    <i className="fas fa-trash text-xs"></i>
                  </button>
                )}
                <div className="h-48 sm:h-52 flex items-center justify-center overflow-hidden bg-gray-900 group">
                  {proj.imageUrl ? (
                    <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className={`w-full h-full ${proj.bgColor} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                      <i className={`${proj.icon || 'fas fa-code'} text-5xl sm:text-6xl text-white opacity-90 group-hover:opacity-100`}></i>
                    </div>
                  )}
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-gray-800/80 backdrop-blur-sm">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">{proj.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{proj.description}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-700/50 mt-auto">
                    {proj.liveLink && (
                      <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-[#2563EB] font-semibold hover:text-blue-400 transition-colors flex items-center gap-1 text-sm">
                        Live Demo <i className="fas fa-external-link-alt text-xs"></i>
                      </a>
                    )}
                    {proj.githubLink && (
                      <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <i className="fab fa-github text-xl"></i>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}