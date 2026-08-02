import React from 'react';

export default function Skills({ defaultSkills, customSkills, isAdminLoggedIn, setIsSkillModalOpen, handleDeleteDefaultSkill, handleDeleteCustomSkill }) {
  return (
    <section id="skills" className="min-h-screen w-full bg-gray-800/50 skills-bg px-4 sm:px-6 flex flex-col justify-center items-center pt-16">
      <div className="max-w-6xl w-full text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">My Skills</h2>
        {isAdminLoggedIn && (
          <button onClick={() => setIsSkillModalOpen(true)} className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg inline-flex items-center gap-2 mb-6">
            <i className="fas fa-plus text-xs"></i> Add Skill
          </button>
        )}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4 max-w-4xl mx-auto">
          {defaultSkills.map((skill, index) => (
            <div key={`default-${index}`} className="skill-badge inline-flex items-center gap-2">
              <span>{skill}</span>
              {isAdminLoggedIn && (
                <button onClick={() => handleDeleteDefaultSkill(index)} className="text-red-400 hover:text-red-200 ml-1 p-0.5 transition cursor-pointer" title="Delete">
                  <i className="fas fa-times text-xs"></i>
                </button>
              )}
            </div>
          ))}
          {customSkills.map((skill, index) => (
            <div key={`custom-${index}`} className="skill-badge inline-flex items-center gap-2">
              <span>{skill.name}</span>
              {isAdminLoggedIn && (
                <button onClick={() => handleDeleteCustomSkill(skill._id)} className="text-red-400 hover:text-red-200 ml-1 p-0.5 transition cursor-pointer" title="Delete">
                  <i className="fas fa-times text-xs"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}