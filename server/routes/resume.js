const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.js');
const upload = require('../middleware/upload.js');
const extractText = require("../services/resumeParser.js");
const Resume = require("../models/Resume.js");

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

module.exports = router;