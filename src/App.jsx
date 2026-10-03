import React, { useState, useEffect } from 'react';
import initialData from './data.json';
import { saveToGitHub } from './githubApi';
import './style.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
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
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  
  // Saving States
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [isSavingEdu, setIsSavingEdu] = useState(false);
  const [isSavingSkill, setIsSavingSkill] = useState(false);
  const [isSavingResume, setIsSavingResume] = useState(false);
  const [isSavingAchievement, setIsSavingAchievement] = useState(false);

  // Data States
  const [projects, setProjects] = useState(initialData.projects || []);
  const [newProject, setNewProject] = useState({ title: '', description: '', liveLink: '', githubLink: '', icon: 'fas fa-code', bgColor: 'bg-[#2563EB]', imageUrl: '' });

  const [educations, setEducations] = useState(initialData.education || []);
  const [newEdu, setNewEdu] = useState({ category: 'Academic Background', title: '', subtitle: '', year: '', icon: 'fas fa-graduation-cap' });

  // Default Skills and Custom Skills
  const [defaultSkills, setDefaultSkills] = useState([
    "Python", "Python Libraries", "DBMS (SQL)", "Power BI Desktop", "Tableau", "HTML", "CSS", "Git & GitHub", "Advance Excel", "MongoDB"
  ]);
  const [customSkills, setCustomSkills] = useState(initialData.skills || []);
  const [newSkill, setNewSkill] = useState({ name: '' });

  const [resumes, setResumes] = useState(initialData.resume || []);
  const [newResume, setNewResume] = useState({ fileName: '', fileData: '' });

  const [achievements, setAchievements] = useState(initialData.achievements || []);
  const [newAchievement, setNewAchievement] = useState({ category: 'Certification', title: '', issuer: '', description: '', icon: 'fas fa-award text-yellow-400' });

  const [profile, setProfile] = useState(initialData.profile || {
    name: "Umesh Thakur",
    tagline: "Transforming raw data into intelligent insights using Python, SQL, and AI.",
    aboutHeading: "Data Analyst & Tech Enthusiast",
    aboutText: "I am a passionate Data Analyst with a strong foundation in Python, SQL, and data visualization tools like Power BI and Tableau. I love turning complex datasets into actionable business insights.",
    profileImage: "/Profile Picture.jpeg"
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Toast Notification State (iPhone Style)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Sync to GitHub
  const syncData = async (updatedDataOverrides) => {
    const fullData = {
      profile,
      projects,
      education: educations,
      skills: customSkills,
      achievements,
      resume: resumes,
      ...updatedDataOverrides
    };
    await saveToGitHub(fullData);
  };

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
      const newProjWithId = { ...newProject, _id: Date.now().toString() };
      const updatedProjects = [...projects, newProjWithId];
      await syncData({ projects: updatedProjects });
      setProjects(updatedProjects);
      setNewProject({ title: '', description: '', liveLink: '', githubLink: '', icon: 'fas fa-code', bgColor: 'bg-[#2563EB]', imageUrl: '' });
      setIsAddModalOpen(false);
      showToast("Project added successfully!");
    } catch (err) { showToast(err.message || "Network Error", "error"); } finally { setIsSavingProject(false); }
  };

  const handleAddEducation = async (e) => {
    e.preventDefault();
    setIsSavingEdu(true);
    try {
      const newEduWithId = { ...newEdu, _id: Date.now().toString() };
      const updatedEdu = [...educations, newEduWithId];
      await syncData({ education: updatedEdu });
      setEducations(updatedEdu);
      setNewEdu({ category: 'Academic Background', title: '', subtitle: '', year: '', icon: 'fas fa-graduation-cap' });
      setIsEduModalOpen(false);
      showToast("Education added successfully!");
    } catch (err) { showToast(err.message || "Network Error", "error"); } finally { setIsSavingEdu(false); }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    setIsSavingSkill(true);
    try {
      const newSkillWithId = { ...newSkill, _id: Date.now().toString() };
      const updatedSkills = [...customSkills, newSkillWithId];
      await syncData({ skills: updatedSkills });
      setCustomSkills(updatedSkills);
      setNewSkill({ name: '' });
      setIsSkillModalOpen(false);
      showToast("Skill added successfully!");
    } catch (err) { showToast(err.message || "Network Error", "error"); } finally { setIsSavingSkill(false); }
  };

  const handleAddResume = async (e) => {
    e.preventDefault();
    setIsSavingResume(true);
    try {
      const newResWithId = { ...newResume, _id: Date.now().toString() };
      const updatedResumes = [newResWithId];
      await syncData({ resume: updatedResumes });
      setResumes(updatedResumes);
      setNewResume({ fileName: '', fileData: '' });
      setIsResumeModalOpen(false);
      showToast("Resume updated successfully!");
    } catch (err) { showToast(err.message || "Network Error", "error"); } finally { setIsSavingResume(false); }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      await syncData({ profile });
      setIsProfileModalOpen(false);
      showToast("Profile updated successfully!");
    } catch (err) { showToast(err.message || "Network Error", "error"); } finally { setIsSavingProfile(false); }
  };

  const handleAddAchievement = async (e) => {
    e.preventDefault();
    setIsSavingAchievement(true);
    try {
      const newAchWithId = { ...newAchievement, _id: Date.now().toString() };
      const updatedAch = [...achievements, newAchWithId];
      await syncData({ achievements: updatedAch });
      setAchievements(updatedAch);
      setNewAchievement({ category: 'Certification', title: '', issuer: '', description: '', icon: 'fas fa-award text-yellow-400' });
      setIsAchievementModalOpen(false);
      showToast("Achievement added successfully!");
    } catch (err) { showToast(err.message || "Network Error", "error"); } finally { setIsSavingAchievement(false); }
  };

  // Delete Functions
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      const updated = projects.filter(p => p._id !== id);
      await syncData({ projects: updated });
      setProjects(updated);
      showToast("Project deleted");
    } catch(err) { showToast(err.message, "error"); }
  };

  const handleDeleteEducation = async (id) => {
    if (!window.confirm("Delete this education?")) return;
    try {
      const updated = educations.filter(e => e._id !== id);
      await syncData({ education: updated });
      setEducations(updated);
      showToast("Education deleted");
    } catch(err) { showToast(err.message, "error"); }
  };

  const handleDeleteDefaultSkill = (indexToRemove) => {
    if (!window.confirm("Delete this skill?")) return;
    setDefaultSkills(defaultSkills.filter((_, index) => index !== indexToRemove));
    showToast("Default skill removed");
  };

  const handleDeleteCustomSkill = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      const updated = customSkills.filter(s => s._id !== id);
      await syncData({ skills: updated });
      setCustomSkills(updated);
      showToast("Skill deleted");
    } catch(err) { showToast(err.message, "error"); }
  };

  const handleDeleteResume = async (id) => {
    if (!window.confirm("Remove custom resume? It will revert to the default file.")) return;
    try {
      await syncData({ resume: [] });
      setResumes([]);
      showToast("Custom resume removed!");
    } catch(err) { showToast(err.message, "error"); }
  };

  const handleDeleteAchievement = async (id) => {
    if (!window.confirm("Delete this achievement?")) return;
    try {
      const updated = achievements.filter(a => a._id !== id);
      await syncData({ achievements: updated });
      setAchievements(updated);
      showToast("Achievement deleted");
    } catch(err) { showToast(err.message, "error"); }
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
      
      <Home 
        profile={profile} 
        isAdminLoggedIn={isAdminLoggedIn} 
        setIsProfileModalOpen={setIsProfileModalOpen} 
      />
      <About 
        projectCount={projects.length} 
        eduCount={educations.length} 
        profile={profile} 
      />
      
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
      
      <Achievements 
        achievements={achievements}
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAchievementModalOpen={setIsAchievementModalOpen}
        handleDeleteAchievement={handleDeleteAchievement}
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

      {isAchievementModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-700 w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl relative my-auto">
            <button type="button" onClick={() => setIsAchievementModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold p-2"><i className="fas fa-times"></i></button>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-wide mb-6 text-center text-white border-b border-gray-800 pb-4">Add Achievement</h3>
            <form onSubmit={handleAddAchievement} className="space-y-4">
              <select value={newAchievement.category} onChange={(e) => setNewAchievement({...newAchievement, category: e.target.value, icon: e.target.value === 'Certification' ? 'fas fa-certificate text-yellow-400' : e.target.value === 'Teaching & Training' ? 'fas fa-chalkboard-teacher text-[#2563EB]' : 'fas fa-trophy text-emerald-400'})} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none">
                <option value="Certification">Certification</option>
                <option value="Teaching & Training">Teaching & Training</option>
                <option value="Project Achievement">Project Achievement</option>
              </select>
              <input type="text" placeholder="Title" required value={newAchievement.title} onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-[#2563EB]" />
              <input type="text" placeholder="Issuer / Organization" required value={newAchievement.issuer} onChange={(e) => setNewAchievement({...newAchievement, issuer: e.target.value})} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-[#2563EB]" />
              <textarea placeholder="Description" rows="3" required value={newAchievement.description} onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-[#2563EB] resize-none"></textarea>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="button" onClick={() => setIsAchievementModalOpen(false)} className="w-full sm:w-1/2 bg-gray-700 text-white font-medium py-3 rounded-xl">Cancel</button>
                <button type="submit" disabled={isSavingAchievement} className="w-full sm:w-1/2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-3 rounded-xl disabled:opacity-50">{isSavingAchievement ? 'Saving...' : 'Save Achievement'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-700 w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl relative my-auto">
            <button type="button" onClick={() => setIsProfileModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold p-2"><i className="fas fa-times"></i></button>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-wide mb-6 text-center text-white border-b border-gray-800 pb-4">Edit Profile Info</h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <input type="text" placeholder="Your Name" required value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-[#2563EB]" />
              <textarea placeholder="Tagline (Home Section)" rows="2" required value={profile.tagline} onChange={(e) => setProfile({...profile, tagline: e.target.value})} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-[#2563EB] resize-none"></textarea>
              <input type="text" placeholder="About Heading" required value={profile.aboutHeading} onChange={(e) => setProfile({...profile, aboutHeading: e.target.value})} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-[#2563EB]" />
              <textarea placeholder="About Text" rows="4" required value={profile.aboutText} onChange={(e) => setProfile({...profile, aboutText: e.target.value})} className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-[#2563EB] resize-none"></textarea>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="button" onClick={() => setIsProfileModalOpen(false)} className="w-full sm:w-1/2 bg-gray-700 text-white font-medium py-3 rounded-xl">Cancel</button>
                <button type="submit" disabled={isSavingProfile} className="w-full sm:w-1/2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-3 rounded-xl disabled:opacity-50">{isSavingProfile ? 'Saving...' : 'Save Profile'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* iPhone Style Toast Notification */}
      <div className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-500 ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl backdrop-blur-md font-semibold text-sm tracking-wide border
          ${toast.type === 'error' ? 'bg-red-500/90 text-white border-red-400' : 'bg-white/95 text-gray-800 border-gray-200'}
        `}>
          {toast.type === 'success' ? (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white shadow-inner">
              <i className="fas fa-check text-xs"></i>
            </div>
          ) : (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white shadow-inner">
              <i className="fas fa-times text-xs"></i>
            </div>
          )}
          <span>{toast.message}</span>
        </div>
      </div>

    </div>
  );
}

export default App;