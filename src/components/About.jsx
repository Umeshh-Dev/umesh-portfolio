import React from 'react';

export default function About({ projectCount, eduCount }) {
  return (
    <section id="about" className="min-h-screen w-full px-4 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center items-center pt-16">
      <div className="w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">About Me</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-gray-400 leading-relaxed text-base sm:text-lg content-text space-y-4">
            <p>I have completed my college and currently equipped with hands-on knowledge of Python, SQL, NumPy, Pandas, and Business Intelligence tools.</p>
            <p>I am passionate about data analysis and extracting meaningful insights from data to solve real-world problems.</p>
            <p>I continuously work on improving my analytical and technical skills in the field of Data Science.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800 rounded-lg text-center border border-gray-700 card-bg shadow-md">
              <h3 className="text-2xl font-bold text-[#22C55E]">{projectCount}</h3>
              <p className="text-xs sm:text-sm mt-1">Projects</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg text-center border border-gray-700 card-bg shadow-md">
              <h3 className="text-2xl font-bold text-[#22C55E]">{eduCount}</h3>
              <p className="text-xs sm:text-sm mt-1">Education & Credentials</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}