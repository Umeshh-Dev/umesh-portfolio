import React from 'react';

export default function Home() {
  return (
    <section id="home" className="min-h-screen w-full flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-24 pb-12">
      <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full mb-6 border-4 border-[#2563EB] overflow-hidden shadow-2xl flex items-center justify-center bg-white">
        <img src="/Profile Picture.jpeg" alt="Umesh Thakur" className="min-w-[155%] min-h-[155%] object-cover" style={{ objectPosition: 'center 20%' }} />
      </div>
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 text-white">Hi, I'm <span className="text-[#2563EB]">Umesh Thakur</span></h1>
      <p className="text-base sm:text-xl text-gray-400 mb-8 max-w-xl sm:max-w-2xl hero-subtext px-2">Transforming raw data into intelligent insights using Python, SQL, and AI.</p>
      <a href="#skills" className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg">View My Work</a>
    </section>
  );
}