import React, { useState, useEffect } from 'react';
import './style.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  
  // Saving States
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [isSavingEdu, setIsSavingEdu] = useState(false);
  const [isSavingSkill, setIsSavingSkill] = useState(false);
  const [isSavingResume, setIsSavingResume] = useState(false);

  // Data States
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', liveLink: '', githubLink: '', icon: 'fas fa-code', bgColor: 'bg-[#2563EB]', imageUrl: '' });

  const [educations, setEducations] = useState([]);
  const [newEdu, setNewEdu] = useState({ category: 'Academic Background', title: '', subtitle: '', year: '', icon: 'fas fa-graduation-cap' });

  // Default Skills and Custom Skills
  const [defaultSkills, setDefaultSkills] = useState([
    "Python", "Python Libraries", "DBMS (SQL)", "Power BI Desktop", "Tableau", "HTML", "CSS", "Git & GitHub", "Advance Excel", "MongoDB"
  ]);
  const [customSkills, setCustomSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '' });

  const [resumes, setResumes] = useState([]);
  const [newResume, setNewResume] = useState({ fileName: '', fileData: '' });

  // Fetch API Data
  useEffect(() => {
    fetch('http://localhost:5000/api/projects').then(res => res.json()).then(data => setProjects(data)).catch(err => console.error(err));
    fetch('http://localhost:5000/api/education').then(res => res.json()).then(data => setEducations(data)).catch(err => console.error(err));
    fetch('http://localhost:5000/api/skills').then(res => res.json()).then(data => setCustomSkills(data)).catch(err => console.error(err));
    fetch('http://localhost:5000/api/resume').then(res => res.json()).then(data => setResumes(data)).catch(err => console.error(err));
  }, []);

  // Theme Toggler
  useEffect(() => {
    if (isDarkMode) document.body.classList.remove('light-theme');
    else document.body.classList.add('light-theme');
  }, [isDarkMode]);

  const activeResumeLink = resumes.length > 0 ? resumes[0].fileData : "/UmeshThakur(Resume)Data Analyst.pdf";

  // Handle File Uploads
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

  // Add Functions
  const handleAddProject = async (e) => {
    e.preventDefault();
    setIsSavingProject(true);
    try {
      const res = await fetch('http://localhost:5000/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-secret': 'Umesh123' }, body: JSON.stringify(newProject) });
      const data = await res.json();
      if (res.ok) { setProjects([...projects, data]); setNewProject({ title: '', description: '', liveLink: '', githubLink: '', icon: 'fas fa-code', bgColor: 'bg-[#2563EB]', imageUrl: '' }); setIsAddModalOpen(false); alert("✅ Project added successfully!"); } else alert("❌ " + data.message);
    } catch (err) { alert("❌ Network Error"); } finally { setIsSavingProject(false); }
  };

  const handleAddEducation = async (e) => {
    e.preventDefault();
    setIsSavingEdu(true);
    try {
      const res = await fetch('http://localhost:5000/api/education', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-secret': 'Umesh123' }, body: JSON.stringify(newEdu) });
      const data = await res.json();
      if (res.ok) { setEducations([...educations, data]); setNewEdu({ category: 'Academic Background', title: '', subtitle: '', year: '', icon: 'fas fa-graduation-cap' }); setIsEduModalOpen(false); alert("✅ Education added successfully!"); } else alert("❌ " + data.message);
    } catch (err) { alert("❌ Network Error"); } finally { setIsSavingEdu(false); }
  };

  // Local Skill Addition (Fixed Network Error)
  const handleAddSkill = (e) => {
    e.preventDefault();
    setIsSavingSkill(true);
    const newCustomSkillObj = { _id: Date.now().toString(), name: newSkill.name };
    setCustomSkills([...customSkills, newCustomSkillObj]);
    setNewSkill({ name: '' });
    setIsSkillModalOpen(false);
    setIsSavingSkill(false);
    alert("✅ Skill added successfully!");
  };

  const handleAddResume = async (e) => {
    e.preventDefault();
    setIsSavingResume(true);
    try {
      const res = await fetch('http://localhost:5000/api/resume', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-secret': 'Umesh123' }, body: JSON.stringify(newResume) });
      const data = await res.json();
      if (res.ok) { setResumes([data]); setNewResume({ fileName: '', fileData: '' }); setIsResumeModalOpen(false); alert("✅ Resume updated successfully!"); } else alert("❌ " + data.message);
    } catch (err) { alert("❌ Network Error"); } finally { setIsSavingResume(false); }
  };

  // Delete Functions
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    const res = await fetch(`http://localhost:5000/api/projects/${id}`, { method: 'DELETE', headers: { 'x-admin-secret': 'Umesh123' } });
    if (res.ok) setProjects(projects.filter(p => p._id !== id)); else alert("❌ Unauthorized deletion!");
  };

  const handleDeleteEducation = async (id) => {
    if (!window.confirm("Delete this education?")) return;
    const res = await fetch(`http://localhost:5000/api/education/${id}`, { method: 'DELETE', headers: { 'x-admin-secret': 'Umesh123' } });
    if (res.ok) setEducations(educations.filter(e => e._id !== id)); else alert("❌ Unauthorized deletion!");
  };

  const handleDeleteDefaultSkill = (indexToRemove) => {
    if (!window.confirm("Delete this skill?")) return;
    setDefaultSkills(defaultSkills.filter((_, index) => index !== indexToRemove));
  };

  const handleDeleteCustomSkill = (id) => {
    if (!window.confirm("Delete this skill?")) return;
    setCustomSkills(customSkills.filter(s => s._id !== id));
  };

  const handleDeleteResume = async (id) => {
    if (!window.confirm("Remove custom resume? It will revert to the default file.")) return;
    const res = await fetch(`http://localhost:5000/api/resume/${id}`, { method: 'DELETE', headers: { 'x-admin-secret': 'Umesh123' } });
    if (res.ok) { setResumes([]); alert("🗑️ Custom resume removed!"); } else alert("❌ Unauthorized deletion!");
  };

  return (
    <div className="app-container relative overflow-x-hidden">
      
      <Navbar 
        isAdminLoggedIn={isAdminLoggedIn} 
        setIsAdminLoggedIn={setIsAdminLoggedIn} 
        isDarkMode={isDarkMode} 
        toggleTheme={() => setIsDarkMode(!isDarkMode)} 
        activeResumeLink={activeResumeLink} 
        setIsResumeModalOpen={setIsResumeModalOpen} 
      />
      
      <Home />
      <About projectCount={projects.length} eduCount={educations.length} />
      
      <Skills 
        defaultSkills={defaultSkills}
        customSkills={customSkills}
        isAdminLoggedIn={isAdminLoggedIn}
        setIsSkillModalOpen={setIsSkillModalOpen}
        handleDeleteDefaultSkill={handleDeleteDefaultSkill}
        handleDeleteCustomSkill={handleDeleteCustomSkill}
      />
      
      <Projects 
        projects={projects} 
        isAdminLoggedIn={isAdminLoggedIn} 
        setIsAddModalOpen={setIsAddModalOpen} 
        handleDeleteProject={handleDeleteProject} 
      />

      <Education 
        educations={educations} 
        isAdminLoggedIn={isAdminLoggedIn} 
        setIsEduModalOpen={setIsEduModalOpen} 
        handleDeleteEducation={handleDeleteEducation} 
      />
      
      <Contact />

      <footer className="py-8 sm:py-10 pb-40 border-t border-gray-800 text-center text-gray-500 text-xs sm:text-sm px-4">
        <p>&copy; Umesh Thakur. Built with <i className="fas fa-heart text-red-500"></i> and Passion.</p>
      </footer>

      {/* --- ALL MODALS --- */}
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

      {isEduModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-700 w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl relative my-auto">
            <button type="button" onClick={() => setIsEduModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold p-2"><i className="fas fa-times"></i></button>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-wide mb-6 text-center text-white border-b border-gray-800 pb-4">Add Education</h3>
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

      {isResumeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-700 w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl relative my-auto">
            <button type="button" onClick={() => setIsResumeModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold p-2"><i className="fas fa-times"></i></button>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-wide mb-6 text-center text-white border-b border-gray-800 pb-4">Manage Resume</h3>
            <form onSubmit={handleAddResume} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1">Upload New Resume (PDF)</label>
                <input type="file" accept="application/pdf" onChange={handleResumeUpload} className="w-full p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs sm:text-sm outline-none cursor-pointer" required />
              </div>
              {resumes.length > 0 && (
                <div className="p-3 bg-gray-800 rounded-xl border border-gray-700 flex justify-between items-center">
                  <span className="text-xs text-gray-300">Custom Resume Active</span>
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
    </div>
  );
}

export default App;