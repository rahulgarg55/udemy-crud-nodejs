const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const path = require('path')

// Connect to MongoDB using the environment variable
mongoose.connect(`${process.env.MONGODB_URI}`, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
  console.log("mongodb is connected")
});

app.use(cors());
// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));

// Serve static assets (build folder) if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  // Serve the index.html file for all routes in your client-side application
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
