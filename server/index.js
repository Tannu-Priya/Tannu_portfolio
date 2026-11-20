import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import mammoth from 'mammoth';
import { createRequire } from 'module';
import { aiService } from './aiService.js';
import { KNOWLEDGE_BASE } from './knowledgeBase.js';

const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Multer memory storage configuration (100% in-memory, zero file retention)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max limit
  fileFilter: (req, file, cb) => {
    const allowed = /\.(pdf|docx|txt|md|json)$/i;
    if (allowed.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format. Only PDF, DOCX, TXT, and MD files are supported.'));
    }
  }
});

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'OBSIDIAN X AI System',
    timestamp: new Date().toISOString()
  });
});

// A. Personal AI Assistant ("Ask Tannu AI")
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    const response = await aiService.answerQuery(message, history || []);
    res.json(response);
  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: 'Unable to process AI query at this moment.' });
  }
});

// C. AI Project Consultant
app.post('/api/project-consultant', async (req, res) => {
  try {
    const { idea, serviceType } = req.body;
    if (!idea || typeof idea !== 'string') {
      return res.status(400).json({ error: 'Project description is required.' });
    }

    const proposal = await aiService.consultProject(idea, serviceType);
    res.json(proposal);
  } catch (error) {
    console.error('Project consultant error:', error);
    res.status(500).json({ error: error.message || 'Error generating project consultation.' });
  }
});

// D.1. AI Resume Upload & Dynamic Extraction (PDF, DOCX, TXT)
app.post('/api/resume/upload-and-analyze', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded.' });
    }

    const { targetJobDescription } = req.body;
    const file = req.file;
    let extractedText = '';

    const fileName = file.originalname.toLowerCase();

    if (fileName.endsWith('.pdf')) {
      const pdfData = await pdf(file.buffer);
      extractedText = pdfData.text || '';
    } else if (fileName.endsWith('.docx')) {
      const docxData = await mammoth.extractRawText({ buffer: file.buffer });
      extractedText = docxData.value || '';
    } else {
      extractedText = file.buffer.toString('utf-8');
    }

    if (!extractedText.trim()) {
      return res.status(400).json({ error: 'Could not extract readable text from the uploaded document.' });
    }

    const analysis = await aiService.analyzeResume(extractedText, targetJobDescription);
    res.json({
      success: true,
      fileInfo: {
        name: file.originalname,
        size: `${Math.round(file.size / 1024)} KB`,
        type: file.mimetype
      },
      extractedTextSnippet: extractedText.slice(0, 300) + '...',
      analysis
    });
  } catch (error) {
    console.error('File upload analysis error:', error);
    res.status(500).json({ error: error.message || 'Failed to parse and analyze uploaded resume.' });
  }
});

// D.2. AI Resume Text Analyzer (Direct Paste)
app.post('/api/resume-analyzer', async (req, res) => {
  try {
    const { resumeText, targetJobDescription } = req.body;
    if (!resumeText || typeof resumeText !== 'string') {
      return res.status(400).json({ error: 'Resume text is required.' });
    }

    const analysis = await aiService.analyzeResume(resumeText, targetJobDescription);
    res.json(analysis);
  } catch (error) {
    console.error('Resume analyzer error:', error);
    res.status(500).json({ error: error.message || 'Error analyzing resume.' });
  }
});

// D.3. Bullet Point Optimizer Assistant
app.post('/api/resume/optimize-bullet', async (req, res) => {
  try {
    const { bulletText } = req.body;
    if (!bulletText || typeof bulletText !== 'string') {
      return res.status(400).json({ error: 'Bullet point text is required.' });
    }

    const optimized = await aiService.optimizeBullet(bulletText);
    res.json(optimized);
  } catch (error) {
    console.error('Bullet optimizer error:', error);
    res.status(500).json({ error: 'Error optimizing bullet point.' });
  }
});

// E. AI Smart Project Finder
app.get('/api/projects/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json(KNOWLEDGE_BASE.projects);
    }

    const matches = await aiService.searchProjects(String(q));
    res.json(matches);
  } catch (error) {
    console.error('Smart project finder error:', error);
    res.status(500).json({ error: 'Error searching projects.' });
  }
});

// G. AI Lead Generation / Inquiry Submission
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, description, serviceType, budget, timeline } = req.body;
    if (!name || !email || !description) {
      return res.status(400).json({ error: 'Name, email, and description are required.' });
    }

    const inquiry = await aiService.saveInquiry({
      name,
      email,
      description,
      serviceType,
      budget,
      timeline
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry received securely. Tannu Priya will follow up promptly.',
      inquiry
    });
  } catch (error) {
    console.error('Inquiry submission error:', error);
    res.status(500).json({ error: 'Failed to record project inquiry.' });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`[OBSIDIAN X] AI Backend Server active on http://localhost:${PORT}`);
});
