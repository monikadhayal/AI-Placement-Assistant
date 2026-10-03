// multer (PDF upload)

const multer =  require('multer');

const upload = multer({
  storage: multer.memoryStorage(), // file ko memory me rakho
  limits: { fileSize: 5 * 1024 * 1024 },

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true); //allow karo
    } else {
      cb(new Error("Only PDF files are allowed")); // reject karo dost
    }
  },
}).single("resume");

module.exports = upload;