const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-admin-secret']
}));

const MONGO_URI = process.env.MONGO_URI;
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'Umesh123';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// Admin Verification Middleware (Security Guard)
const verifyAdmin = (req, res, next) => {
  const clientSecret = req.headers['x-admin-secret'];
  if (clientSecret === ADMIN_SECRET) {
    next();
  } else {
    res.status(403).json({ message: '❌ Unauthorized: Admin access required!' });
  }
};

// Schemas & Models
const projectSchema = new mongoose.Schema({ title: String, description: String, liveLink: String, githubLink: String, icon: String, bgColor: String, imageUrl: String });
const Project = mongoose.model('Project', projectSchema);

const educationSchema = new mongoose.Schema({ category: String, title: String, subtitle: String, year: String, icon: String });
const Education = mongoose.model('Education', educationSchema);

const skillSchema = new mongoose.Schema({ name: String });
const Skill = mongoose.model('Skill', skillSchema);

const resumeSchema = new mongoose.Schema({ fileName: String, fileData: String });
const Resume = mongoose.model('Resume', resumeSchema);

// Public Routes (GET)
app.get('/api/projects', async (req, res) => {
  try { const projects = await Project.find(); res.json(projects); } catch (err) { res.status(500).json({ message: err.message }); }
});
app.get('/api/education', async (req, res) => {
  try { const educations = await Education.find(); res.json(educations); } catch (err) { res.status(500).json({ message: err.message }); }
});
app.get('/api/skills', async (req, res) => {
  try { const skills = await Skill.find(); res.json(skills); } catch (err) { res.status(500).json({ message: err.message }); }
});
app.get('/api/resume', async (req, res) => {
  try { const resume = await Resume.find(); res.json(resume); } catch (err) { res.status(500).json({ message: err.message }); }
});

// Protected Admin Routes (POST & DELETE)
app.post('/api/projects', verifyAdmin, async (req, res) => {
  try {
    const newProject = new Project({ ...req.body, icon: req.body.icon || 'fas fa-code', bgColor: req.body.bgColor || 'bg-[#2563EB]' });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) { res.status(400).json({ message: err.message }); }
});
app.delete('/api/projects/:id', verifyAdmin, async (req, res) => {
  try { await Project.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/education', verifyAdmin, async (req, res) => {
  try {
    const newEdu = new Education({ ...req.body, icon: req.body.icon || 'fas fa-graduation-cap' });
    await newEdu.save();
    res.status(201).json(newEdu);
  } catch (err) { res.status(400).json({ message: err.message }); }
});
app.delete('/api/education/:id', verifyAdmin, async (req, res) => {
  try { await Education.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/skills', verifyAdmin, async (req, res) => {
  try { const newSkill = new Skill(req.body); await newSkill.save(); res.status(201).json(newSkill); } catch (err) { res.status(400).json({ message: err.message }); }
});
app.delete('/api/skills/:id', verifyAdmin, async (req, res) => {
  try { await Skill.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/resume', verifyAdmin, async (req, res) => {
  try {
    await Resume.deleteMany({}); // Sirf ek hi active resume rakhenge
    const newResume = new Resume(req.body);
    await newResume.save();
    res.status(201).json(newResume);
  } catch (err) { res.status(400).json({ message: err.message }); }
});
app.delete('/api/resume/:id', verifyAdmin, async (req, res) => {
  try { await Resume.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (err) { res.status(500).json({ message: err.message }); }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));