import React, { useState, useEffect } from 'react';

export default function Education({ educations, isAdminLoggedIn, setIsEduModalOpen, handleDeleteEducation }) {
  const [isEduVisible, setIsEduVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('education-section');
      if (section) {
        const top = section.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) setIsEduVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="education-section" className="min-h-screen w-full px-4 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center items-center pt-16">
      <div className="w-full">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Education & Credentials</h2>
          {isAdminLoggedIn && (
            <button onClick={() => setIsEduModalOpen(true)} className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg inline-flex items-center gap-2 mt-2">
              <i className="fas fa-plus text-xs"></i> Add Education
            </button>
          )}
        </div>
        <div className={`transition-all duration-1000 transform ${isEduVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          {educations.length === 0 ? (
            <p className="text-center text-gray-400 mb-12">No education details added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {educations.map((edu, index) => (
                <div key={index} className="relative bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 sm:p-8 shadow-2xl transition hover:border-gray-500">
                  {isAdminLoggedIn && (
                    <button onClick={() => handleDeleteEducation(edu._id)} className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg" title="Delete">
                      <i className="fas fa-trash text-xs"></i>
                    </button>
                  )}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 sm:p-4 bg-blue-600/20 text-blue-400 rounded-xl text-xl sm:text-2xl">
                      <i className={edu.category === 'Academic Background' ? 'fas fa-graduation-cap' : 'fas fa-scroll'}></i>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{edu.category}</h3>
                      {edu.year && <span className="text-xs bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full font-semibold inline-block mt-1">{edu.year}</span>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-200">{edu.title}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">{edu.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}