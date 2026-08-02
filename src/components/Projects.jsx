import React from 'react';

export default function Projects({ projects, isAdminLoggedIn, setIsAddModalOpen, handleDeleteProject }) {
  return (
    <section id="projects" className="min-h-screen w-full px-4 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center items-center pt-16">
      <div className="w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Projects</h2>
          {isAdminLoggedIn && (
            <button onClick={() => setIsAddModalOpen(true)} className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg inline-flex items-center gap-2 mt-2">
              <i className="fas fa-plus text-xs"></i> Add Project
            </button>
          )}
        </div>
        
        {projects.length === 0 ? (
          <p className="text-center text-gray-400 mb-12">No projects added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((proj, index) => (
              <div key={index} className="relative project-card bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl flex flex-col justify-between">
                {isAdminLoggedIn && (
                  <button onClick={() => handleDeleteProject(proj._id)} className="absolute top-3 right-3 z-10 bg-red-600 hover:bg-red-700 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg" title="Delete">
                    <i className="fas fa-trash text-xs"></i>
                  </button>
                )}
                <div className="h-44 sm:h-48 flex items-center justify-center overflow-hidden bg-gray-900">
                  {proj.imageUrl ? (
                    <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full ${proj.bgColor} flex items-center justify-center`}>
                      <i className={`${proj.icon || 'fas fa-code'} text-4xl sm:text-5xl text-white`}></i>
                    </div>
                  )}
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">{proj.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-4 secondary-text">{proj.description}</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-700/50">
                    {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-[#2563EB] font-semibold hover:underline text-sm">Live Demo</a>}
                    {proj.githubLink && (
                      <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-sm">
                        <i className="fab fa-github text-lg sm:text-xl hover:text-white transition-colors"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}