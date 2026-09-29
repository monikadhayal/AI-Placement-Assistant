// entry point

const express = require('express');
const app = express();
require("dotenv").config();
const connectDB = require("./config/db.js");
const Schema = require("./models/User.js");
Schema();
connectDB();

const port = process.env.PORT;

app.get('/',(req,res) =>{
    console.log("hello world!!!!!!!!");
    res.send("hello world!!!!!");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});