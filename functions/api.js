// check one by one
const express = require("express");
const serverless = require("serverless-http");
const authRoute = require("../routes/authRoute");
const messageRoute = require("../routes/messageRoute");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const cors = require("cors");
const app = express();

dotenv.config();
connectDB();
app.use(cors());

app.use(express.json());

app.use("/.netlify/functions/api/auth", authRoute);
app.use("/.netlify/functions/api/message", messageRoute);
module.exports.handler = serverless(app);

// app.listen(3000, () => {
//   console.log("server is running at port " + 3000);
// });
