const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const usersRoutes = require('./routes/users');

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://solunkeakshay02:<Kira@297>@cluster0.twehub2.mongodb.net/mydatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/add-expenses', (req, res) => {
  res.sendFile(path.join(__dirname, 'expense.html'));
});

app.get('/forgot-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'forgot-password.html'));
});

app.use('/', usersRoutes);

app.listen(4000); 