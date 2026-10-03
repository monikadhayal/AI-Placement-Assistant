// PDF se text nikalna

// PDF se text nikalna
// const Resume = require("../models/Resume.js");
const { PDFParse } = require('pdf-parse');

const extractText = async (buffer) => {
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  await parser.destroy();
  return result.text;
};

module.exports = extractText;
