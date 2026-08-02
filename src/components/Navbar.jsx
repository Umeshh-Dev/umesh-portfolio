import React, { useState } from 'react';

export default function Navbar({ isAdminLoggedIn, setIsAdminLoggedIn, isDarkMode, toggleTheme, activeResumeLink, setIsResumeModalOpen }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogoClick = (e) => {
    const newClicks = logoClicks + 1;
    setLogoClicks(newClicks);
    if (newClicks === 3) {
      e.preventDefault();
      setLogoClicks(0);
      if (isAdminLoggedIn) {
        localStorage.removeItem('isAdmin');
        setIsAdminLoggedIn(false);
        alert("🔒 Admin Logged Out!");
      } else {
        const pwd = prompt("Enter Admin Password:");
        if (pwd === "Umesh123") {
          localStorage.setItem('isAdmin', 'true');
          setIsAdminLoggedIn(true);
          alert("🔓 Admin Access Granted!");
        } else if (pwd !== null) alert("❌ Incorrect Password!");
      }
    } else {
      setTimeout(() => setLogoClicks(0), 600);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-gray-800 px-4 sm:px-6 py-4 flex justify-between items-center transition-colors">
      <div className="flex items-center">
        <a href="#home" onClick={handleLogoClick} title="Home">
          <img src="/Main_Logo.png" alt="Logo" className="h-10 sm:h-12 w-auto scale-[1.7] sm:scale-[1.9] origin-left object-contain cursor-pointer" />
        </a>
      </div>
      
      {/* DESKTOP MENU - Optimized Order */}
      <div className="hidden md:flex space-x-6 lg:space-x-8 font-medium items-center text-sm lg:text-base">
        <a href="#home" className="hover:text-[#2563EB] transition">Home</a>
        <a href="#about" className="hover:text-[#2563EB] transition">About</a>
        <a href="#skills" className="hover:text-[#2563EB] transition">Skills</a>
        <a href="#projects" className="hover:text-[#2563EB] transition">Projects</a>
        <a href="#education-section" className="hover:text-[#2563EB] transition">Education</a>
        <a href="#contact" className="hover:text-[#2563EB] transition">Contact</a>
        <div className="inline-flex items-center gap-2">
          <a href={activeResumeLink} target="_blank" rel="noreferrer" className="hover:text-[#2563EB] transition">Resume</a>
          {isAdminLoggedIn && (
            <button onClick={() => setIsResumeModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg text-xs font-semibold transition" title="Edit Resume">
              <i className="fas fa-edit"></i>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        {isAdminLoggedIn && (
          <button onClick={() => { localStorage.removeItem('isAdmin'); setIsAdminLoggedIn(false); alert("🔒 Admin Logged Out!"); }} title="Logout Admin" className="p-2 rounded-full bg-green-600 text-white transition shadow-md">
            <i className="fas fa-cog"></i>
          </button>
        )}
        <button onClick={toggleTheme} className={`p-2 rounded-full transition ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200'}`}>
          <i className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'}`} style={{ color: isDarkMode ? '' : '#F59E0B' }}></i>
        </button>
        <button onClick={toggleMobileMenu} className="md:hidden text-2xl focus:outline-none p-1">
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* MOBILE MENU - Optimized Order */}
      <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} absolute top-full left-0 w-full bg-[#0F172A] border-b border-gray-800 flex-col p-6 space-y-4 md:hidden shadow-xl transition-all`}>
        <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] text-base border-b border-gray-700 pb-2">Home</a>
        <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] text-base border-b border-gray-700 pb-2">About</a>
        <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] text-base border-b border-gray-700 pb-2">Skills</a>
        <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] text-base border-b border-gray-700 pb-2">Projects</a>
        <a href="#education-section" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] text-base border-b border-gray-700 pb-2">Education</a>
        <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] text-base border-b border-gray-700 pb-2">Contact</a>
        <div className="flex items-center justify-between border-b border-gray-700 pb-2">
          <a href={activeResumeLink} target="_blank" rel="noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] text-base">Resume</a>
          {isAdminLoggedIn && (
            <button onClick={() => { setIsMobileMenuOpen(false); setIsResumeModalOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-semibold">
              Edit Resume
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}