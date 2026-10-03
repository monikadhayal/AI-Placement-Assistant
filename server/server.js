// entry point

const express = require('express');
const app = express();
require("dotenv").config();
const connectDB = require("./config/db.js");
const router = require("./routes/auth.js");
app.use(express.json());
app.use("/api/auth", router);

connectDB();

const port = process.env.PORT;

app.get('/',(req,res) =>{
    console.log("hello world!!!!!!!!");
    res.send("hello world!!!!!");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});