import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const [logoClicks, setLogoClicks] = useState(0);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [isSavingEdu, setIsSavingEdu] = useState(false);
  const [isSavingSkill, setIsSavingSkill] = useState(false);
  const [isSavingResume, setIsSavingResume] = useState(false);

  const [isEduVisible, setIsEduVisible] = useState(false);

  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', liveLink: '', githubLink: '', icon: 'fas fa-code', bgColor: 'bg-[#2563EB]', imageUrl: '' });

  const [educations, setEducations] = useState([]);
  const [newEdu, setNewEdu] = useState({ category: 'Academic Background', title: '', subtitle: '', year: '', icon: 'fas fa-graduation-cap' });

  const defaultSkills = ["Python", "Python Libraries", "DBMS (SQL)", "Power BI Desktop", "Tableau", "HTML", "CSS", "Git & GitHub", "Advance Excel", "MongoDB"];
  const [customSkills, setCustomSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '' });

  const [resumes, setResumes] = useState([]);
  const [newResume, setNewResume] = useState({ fileName: '', fileData: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/projects').then(res => res.json()).then(data => setProjects(data)).catch(err => console.error(err));
    fetch('http://localhost:5000/api/education').then(res => res.json()).then(data => setEducations(data)).catch(err => console.error(err));
    fetch('http://localhost:5000/api/skills').then(res => res.json()).then(data => setCustomSkills(data)).catch(err => console.error(err));
    fetch('http://localhost:5000/api/resume').then(res => res.json()).then(data => setResumes(data)).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('education-section');
      if (section) {
        const top = section.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) setIsEduVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) document.body.classList.remove('light-theme');
    else document.body.classList.add('light-theme');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewProject({ ...newProject, imageUrl: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewResume({ fileName: file.name, fileData: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setIsSavingProject(true);
    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': 'Umesh123' }, 
        body: JSON.stringify(newProject)
      });
      const data = await res.json();
      if (res.ok) {
        setProjects([...projects, data]);
        setNewProject({ title: '', description: '', liveLink: '', githubLink: '', icon: 'fas fa-code', bgColor: 'bg-[#2563EB]', imageUrl: '' });
        setIsAddModalOpen(false);
        alert("✅ Project added successfully!");
      } else alert("❌ " + data.message);
    } catch (err) { alert("❌ Network Error"); } finally { setIsSavingProject(false); }
  };

  const handleAddEducation = async (e) => {
    e.preventDefault();
    setIsSavingEdu(true);
    try {
      const res = await fetch('http://localhost:5000/api/education', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': 'Umesh123' }, 
        body: JSON.stringify(newEdu)
      });
      const data = await res.json();
      if (res.ok) {
        setEducations([...educations, data]);
        setNewEdu({ category: 'Academic Background', title: '', subtitle: '', year: '', icon: 'fas fa-graduation-cap' });
        setIsEduModalOpen(false);
        alert("✅ Education added successfully!");
      } else alert("❌ " + data.message);
    } catch (err) { alert("❌ Network Error"); } finally { setIsSavingEdu(false); }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    setIsSavingSkill(true);
    try {
      const res = await fetch('http://localhost:5000/api/skills', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': 'Umesh123' }, 
        body: JSON.stringify(newSkill)
      });
      const data = await res.json();
      if (res.ok) {
        setCustomSkills([...customSkills, data]);
        setNewSkill({ name: '' });
        setIsSkillModalOpen(false);
        alert("✅ Skill added successfully!");
      } else alert("❌ " + data.message);
    } catch (err) { alert("❌ Network Error"); } finally { setIsSavingSkill(false); }
  };

  const handleAddResume = async (e) => {
    e.preventDefault();
    setIsSavingResume(true);
    try {
      const res = await fetch('http://localhost:5000/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': 'Umesh123' },
        body: JSON.stringify(newResume)
      });
      const data = await res.json();
      if (res.ok) {
        setResumes([data]);
        setNewResume({ fileName: '', fileData: '' });
        setIsResumeModalOpen(false);
        alert("✅ Resume updated successfully!");
      } else alert("❌ " + data.message);
    } catch (err) { alert("❌ Network Error"); } finally { setIsSavingResume(false); }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    const res = await fetch(`http://localhost:5000/api/projects/${id}`, { method: 'DELETE', headers: { 'x-admin-secret': 'Umesh123' } });
    if (res.ok) setProjects(projects.filter(p => p._id !== id));
    else alert("❌ Unauthorized deletion!");
  };

  const handleDeleteEducation = async (id) => {
    if (!window.confirm("Delete this education?")) return;
    const res = await fetch(`http://localhost:5000/api/education/${id}`, { method: 'DELETE', headers: { 'x-admin-secret': 'Umesh123' } });
    if (res.ok) setEducations(educations.filter(e => e._id !== id));
    else alert("❌ Unauthorized deletion!");
  };

  const handleDeleteCustomSkill = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    const res = await fetch(`http://localhost:5000/api/skills/${id}`, { method: 'DELETE', headers: { 'x-admin-secret': 'Umesh123' } });
    if (res.ok) setCustomSkills(customSkills.filter(s => s._id !== id));
    else alert("❌ Unauthorized deletion!");
  };

  const handleDeleteResume = async (id) => {
    if (!window.confirm("Remove custom resume? It will revert to the default file.")) return;
    const res = await fetch(`http://localhost:5000/api/resume/${id}`, { method: 'DELETE', headers: { 'x-admin-secret': 'Umesh123' } });
    if (res.ok) { setResumes([]); alert("🗑️ Custom resume removed!"); }
    else alert("❌ Unauthorized deletion!");
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('⏳ Sending...');
    const formData = new FormData(e.target);
    const res = await fetch("https://formspree.io/f/xlgzapzn", { method: "POST", body: formData, headers: { 'Accept': 'application/json' } });
    if (res.ok) { setFormStatus('✅ Message Sent Successfully!'); e.target.reset(); }
    else setFormStatus('❌ Failed to send message!');
  };

  const activeResumeLink = resumes.length > 0 ? resumes[0].fileData : "/UmeshThakur(Resume)Data Analyst.pdf";

  return (
    <div className="app-container relative overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 glass border-b border-gray-800 px-4 sm:px-6 py-4 flex justify-between items-center transition-colors">
        <div className="flex items-center">
          <a href="#home" onClick={handleLogoClick} title="Home">
            <img src="/Main_Logo.png" alt="Logo" className="h-10 sm:h-12 w-auto scale-[1.7] sm:scale-[1.9] origin-left object-contain cursor-pointer" />
          </a>
        </div>
        
        <div className="hidden md:flex space-x-6 lg:space-x-8 font-medium items-center text-sm lg:text-base">
          <a href="#home" className="hover:text-[#2563EB] transition">Home</a>
          <a href="#about" className="hover:text-[#2563EB] transition">About</a>
          <a href="#education-section" className="hover:text-[#2563EB] transition">Education</a>
          <a href="#projects" className="hover:text-[#2563EB] transition">Projects</a>
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

        <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} absolute top-full left-0 w-full bg-[#0F172A] border-b border-gray-800 flex-col p-6 space-y-4 md:hidden shadow-xl transition-all`}>
          <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] text-lg border-b border-gray-700 pb-2">Home</a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] text-lg border-b border-gray-700 pb-2">About</a>
          <a href="#education-section" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] text-lg border-b border-gray-700 pb-2">Education</a>
          <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] text-lg border-b border-gray-700 pb-2">Projects</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] text-lg border-b border-gray-700 pb-2">Contact</a>
          <div className="flex items-center justify-between border-b border-gray-700 pb-2">
            <a href={activeResumeLink} target="_blank" rel="noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] text-lg">Resume</a>
            {isAdminLoggedIn && (
              <button onClick={() => { setIsMobileMenuOpen(false); setIsResumeModalOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                Edit Resume
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ADD PROJECT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-700 w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl relative my-auto">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold p-2"><i className="fas fa-times"></i></button>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-wide mb-6 text-center text-white border-b border-gray-800 pb-4">Add New Project</h3>
            <form onSubmit={handleAddProject} className="space-y-4">
              <input type="text" placeholder="Title" required value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm sm:text-base outline-none focus:border-[#2563EB]" />
              <input type="text" placeholder="Description" required value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm sm:text-base outline-none focus:border-[#2563EB]" />
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1">Upload Project Picture</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs sm:text-sm outline-none file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#2563EB] file:text-white hover:file:bg-blue-700 cursor-pointer" />
                {newProject.imageUrl && (
                  <div className="mt-3 text-center">
                    <span className="text-xs text-gray-400 block mb-1">Preview:</span>
                    <img src={newProject.imageUrl} alt="Preview" className="w-24 h-16 object-cover rounded-xl mx-auto border border-gray-700 shadow-md" />
                  </div>
                )}
              </div>
              <input type="url" placeholder="Live Link" value={newProject.liveLink} onChange={(e) => setNewProject({...newProject, liveLink: e.target.value})} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm sm:text-base outline-none focus:border-[#2563EB]" />
              <input type="url" placeholder="GitHub Link" value={newProject.githubLink} onChange={(e) => setNewProject({...newProject, githubLink: e.target.value})} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm sm:text-base outline-none focus:border-[#2563EB]" />
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="w-full sm:w-1/2 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-xl transition">Cancel</button>
                <button type="submit" disabled={isSavingProject} className="w-full sm:w-1/2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-3 rounded-xl transition shadow-lg disabled:opacity-50">{isSavingProject ? 'Saving...' : 'Save Project'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD EDUCATION MODAL */}
      {isEduModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-700 w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl relative my-auto">
            <button type="button" onClick={() => setIsEduModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold p-2"><i className="fas fa-times"></i></button>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-wide mb-6 text-center text-white border-b border-gray-800 pb-4">Add Education / Credential</h3>
            <form onSubmit={handleAddEducation} className="space-y-4">
              <select value={newEdu.category} onChange={(e) => setNewEdu({...newEdu, category: e.target.value})} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none">
                <option value="Academic Background">Academic Background</option>
                <option value="Professional Training">Professional Training</option>
              </select>
              <input type="text" placeholder="Title" required value={newEdu.title} onChange={(e) => setNewEdu({...newEdu, title: e.target.value})} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-[#2563EB]" />
              <input type="text" placeholder="Subtitle / Institution" required value={newEdu.subtitle} onChange={(e) => setNewEdu({...newEdu, subtitle: e.target.value})} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-[#2563EB]" />
              <input type="text" placeholder="Year" required value={newEdu.year} onChange={(e) => setNewEdu({...newEdu, year: e.target.value})} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-[#2563EB]" />
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="button" onClick={() => setIsEduModalOpen(false)} className="w-full sm:w-1/2 bg-gray-700 text-white font-medium py-3 rounded-xl">Cancel</button>
                <button type="submit" disabled={isSavingEdu} className="w-full sm:w-1/2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-3 rounded-xl disabled:opacity-50">{isSavingEdu ? 'Saving...' : 'Save Education'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD SKILL MODAL */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-700 w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl relative my-auto">
            <button type="button" onClick={() => setIsSkillModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold p-2"><i className="fas fa-times"></i></button>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-wide mb-6 text-center text-white border-b border-gray-800 pb-4">Add New Skill</h3>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <input type="text" placeholder="Skill Name" required value={newSkill.name} onChange={(e) => setNewSkill({ name: e.target.value })} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-[#2563EB]" />
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="button" onClick={() => setIsSkillModalOpen(false)} className="w-full sm:w-1/2 bg-gray-700 text-white font-medium py-3 rounded-xl">Cancel</button>
                <button type="submit" disabled={isSavingSkill} className="w-full sm:w-1/2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-3 rounded-xl disabled:opacity-50">{isSavingSkill ? 'Saving...' : 'Save Skill'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT RESUME MODAL */}
      {isResumeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-700 w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl relative my-auto">
            <button type="button" onClick={() => setIsResumeModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold p-2"><i className="fas fa-times"></i></button>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-wide mb-6 text-center text-white border-b border-gray-800 pb-4">Manage Resume PDF</h3>
            <form onSubmit={handleAddResume} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1">Upload New Resume (PDF)</label>
                <input type="file" accept="application/pdf" onChange={handleResumeUpload} className="w-full p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs sm:text-sm outline-none file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#2563EB] file:text-white hover:file:bg-blue-700 cursor-pointer" required />
                {newResume.fileName && <p className="text-xs text-green-400 mt-2">Selected: {newResume.fileName}</p>}
              </div>
              {resumes.length > 0 && (
                <div className="p-3 bg-gray-800 rounded-xl border border-gray-700 flex justify-between items-center">
                  <span className="text-xs text-gray-300">Custom Resume is currently active</span>
                  <button type="button" onClick={() => handleDeleteResume(resumes[0]._id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">Delete Custom</button>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="button" onClick={() => setIsResumeModalOpen(false)} className="w-full sm:w-1/2 bg-gray-700 text-white font-medium py-3 rounded-xl">Cancel</button>
                <button type="submit" disabled={isSavingResume} className="w-full sm:w-1/2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-3 rounded-xl disabled:opacity-50">{isSavingResume ? 'Saving...' : 'Save Resume'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HERO SECTION - 1st Image Layout */}
      <section id="home" className="hero min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-28 sm:pt-36 pb-12">
        <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full mb-6 border-4 border-[#2563EB] overflow-hidden shadow-2xl flex items-center justify-center bg-white">
          <img src="/Profile Picture.jpeg" alt="Umesh Thakur" className="min-w-[155%] min-h-[155%] object-cover" style={{ objectPosition: 'center 20%' }} />
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4">Hi, I'm <span className="text-[#2563EB]">Umesh Thakur</span></h1>
        <p className="text-base sm:text-xl text-gray-400 mb-8 max-w-xl sm:max-w-2xl hero-subtext px-2">Transforming raw data into intelligent insights using Python, SQL, and AI.</p>
        <a href="#projects" className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg">View My Work</a>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 id="about" className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-gray-400 leading-relaxed text-base sm:text-lg content-text space-y-4">
            <p>I have completed my college and currently equipped with hands-on knowledge of Python, SQL, NumPy, Pandas, and Business Intelligence tools.</p>
            <p>I am passionate about data analysis and extracting meaningful insights from data to solve real-world problems.</p>
            <p>I continuously work on improving my analytical and technical skills in the field of Data Science.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800 rounded-lg text-center border border-gray-700 card-bg">
              <h3 className="text-2xl font-bold text-[#22C55E]">{projects.length}</h3>
              <p className="text-xs sm:text-sm mt-1">Projects</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg text-center border border-gray-700 card-bg">
              <h3 className="text-2xl font-bold text-[#22C55E]">{educations.length}</h3>
              <p className="text-xs sm:text-sm mt-1">Education & Credentials</p>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div id="education-section" className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Education & Credentials</h2>
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
      </section>

      {/* SKILLS SECTION */}
      <section className="py-16 sm:py-20 bg-gray-800/50 skills-bg px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">My Skills</h2>
          {isAdminLoggedIn && (
            <button onClick={() => setIsSkillModalOpen(true)} className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg inline-flex items-center gap-2 mb-6">
              <i className="fas fa-plus text-xs"></i> Add Skill
            </button>
          )}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
            {defaultSkills.map((skill, index) => (
              <span key={`default-${index}`} className="skill-badge">{skill}</span>
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

      {/* PROJECTS SECTION */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div id="projects" className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Projects</h2>
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
                    <h3 className="text-lg sm:text-xl font-bold mb-2">{proj.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-4 secondary-text">{proj.description}</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-700/50">
                    {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-[#2563EB] font-semibold hover:underline text-sm">Live Demo</a>}
                    {proj.githubLink && (
                      <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-sm">
                        <i className="fab fa-github text-lg sm:text-xl hover:text-white"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CONTACT SECTION */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <h2 id="contact" className="text-2xl sm:text-3xl font-bold mb-6">Get In Touch</h2>
        <p className="text-gray-400 mb-8 sm:mb-10 contact-desc text-sm sm:text-base">Have a project in mind? Let's talk.</p>
        <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-6">
          <input type="text" name="name" placeholder="Name" required className="w-full p-3 sm:p-4 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm sm:text-base" />
          <input type="email" name="email" placeholder="Email" required className="w-full p-3 sm:p-4 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm sm:text-base" />
          <textarea name="message" placeholder="Message" rows="5" required className="w-full p-3 sm:p-4 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm sm:text-base"></textarea>
          <button type="submit" className="w-full sm:w-auto bg-[#2563EB] hover:bg-blue-700 px-8 py-3 rounded-lg transition text-white font-medium text-sm sm:text-base">Send Message</button>
          {formStatus && <p className="text-green-400 font-semibold mt-4 text-sm sm:text-base">{formStatus}</p>}
        </form>
        <div className="mt-10 sm:mt-12 flex justify-center space-x-6 text-xl sm:text-2xl text-gray-400">
          <a href="https://www.linkedin.com/in/umshthakurr/" target="_blank" rel="noreferrer" className="hover:text-[#2563EB] transition"><i className="fab fa-linkedin"></i></a>
          <a href="https://github.com/Umeshh-Dev" target="_blank" rel="noreferrer" className="hover:text-gray-100 transition"><i className="fab fa-github"></i></a>
          <a href="https://x.com/Umesh__thakur0" target="_blank" rel="noreferrer" className="hover:text-[#2563EB] transition"><i className="fab fa-twitter"></i></a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 sm:py-10 border-t border-gray-800 text-center text-gray-500 text-xs sm:text-sm px-4">
        <p>&copy; Umesh Thakur. Built with <i className="fas fa-heart text-red-500"></i> and Passion.</p>
      </footer>
    </div>
  );
}

export default App;