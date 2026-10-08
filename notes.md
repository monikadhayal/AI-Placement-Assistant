<!-- hii my name is monika  -->
<!-- 03-30-2026   ko mene abhi tak do kaam kar diye login registration or resume upload -->

<!-- muje login registration kafi ache se aa gya dost par resume upload em thodi dikat ho gyi samjan eme  ddost  baki sab thik h  -->

<!-- ab me AI resume analyzer karu gyi dost  -->

Poora Backend — Step by Step Recap
Part 1: Base Setup
Naya folder banaya, npm init -y se project shuru kiya
Express install kiya, ek chhota server.js banaya jo "hello world" bhejta tha
Nodemon laga ke dev mode banaya, taaki baar-baar restart na karna pade
.env file + dotenv — secrets (PORT) ko code se alag rakhna seekha


Part 2: Database Connect
Mongoose install kiya
config/db.js banaya — MongoDB Atlas se connect karne wala function
Isको server.js mein call karके database jodа


Part 3: User Model + Auth
models/User.js banaya — name, email, passwordHash, targetRole
express.json() middleware laga, taaki req.body padha ja sake
routes/auth.js banaya, Router setup kiya
Register route likha — email check, bcrypt se password hash, User save
Login route likha — user dhoondo, bcrypt se password compare karo
JWT token banana seekha (jsonwebtoken install), dono routes mein token add kiya
middleware/auth.js (protect) banaya — token verify karकata lagana "kaun login hai"
Protected route se test kiya (/me)


Part 4: Resume Upload
models/Resume.js banaya — user (link), fileName, extractedText, targetRole
multer install + middleware/upload.js banaya — PDF file pakadne ke liye
pdf-parse install + services/resumeParser.js banaya — PDF se text nikalne ke liye
routes/resume.js mein upload route banaya — file lo, text nikalo, database mein save karo


Part 5: AI Resume Analyzer
services/ai.js banaya — Google Gemini ko call karne wala askAI function
services/prompts.js banaya — AI ko instructions (JSON format mein jawab do)
Analyze route banaya resume.js mein — resume dhoondo, AI ko bhejo, jawab ko JSON.parse karके analysis field mein save karo
Bahut sari real-world errors solve ki — galat API key, missing .env values, typos, Google ka naya pdf-parse version, etc.
Final Backend Structure
server/
├── server.js
├── .env
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   └── Resume.js
├── middleware/
│   ├── auth.js (protect)
│   └── upload.js (multer)
├── services/
│   ├── resumeParser.js
│   ├── ai.js
│   └── prompts.js
└── routes/
    ├── auth.js    (register, login, me)
    └── resume.js  (upload, analyze)
Poore backend ka data flow (bada picture)
User → Postman/Frontend
         │
         ▼
  routes/ (URL decide karta hai)
         │
         ▼
  middleware/ (check karta hai — login hai? file sahi hai?)
         │
         ▼
  services/ (asli kaam — PDF padhna, AI se baat karna)
         │
         ▼
  models/ (database se save/load karna)
         │
         ▼
  Response wapas user ko