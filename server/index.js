import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { aiService } from './aiService.js';
import { KNOWLEDGE_BASE } from './knowledgeBase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

// D. AI Resume Analyzer
app.post('/api/resume-analyzer', async (req, res) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText || typeof resumeText !== 'string') {
      return res.status(400).json({ error: 'Resume text is required.' });
    }

    const analysis = await aiService.analyzeResume(resumeText);
    res.json(analysis);
  } catch (error) {
    console.error('Resume analyzer error:', error);
    res.status(500).json({ error: error.message || 'Error analyzing resume.' });
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
