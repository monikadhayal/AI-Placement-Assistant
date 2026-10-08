const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.js');
const upload = require('../middleware/upload.js');
const extractText = require("../services/resumeParser.js");
const Resume = require("../models/Resume.js");
const askAI= require("../services/ai.js");
const RESUME_SYSTEM_PROMPT = require("../services/prompts.js");

router.post('/upload', protect, upload, async (req, res) => {
    const text = await extractText(req.file.buffer);
    
    const resume = await Resume.create({
      user: req.userId,
      fileName: req.file.originalname,
      extractedText: text,
      targetRole: req.body.targetRole,
    });
    res.status(201).json({
        message: "Resume uploaded",
        resume:resume });
});

router.post('/:id/analyze', protect,  async(req,res) => {
  const resume = await Resume.findById(req.params.id);

  const aiReply = await askAI(RESUME_SYSTEM_PROMPT, resume.extractedText);

  const analysis = JSON.parse(aiReply);

  resume.analysis = analysis; // poora naya object de rahi ho, ek part nahi
  await resume.save();

  res.status(200).json({
    message: "Resume analyzed",
    resume: resume,
  });
});



module.exports = router;