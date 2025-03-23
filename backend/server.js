require('dotenv').config();

const mongoose = require('mongoose');

const User = require('./models/user.model');
const Snippet = require('./models/snippet.model');
const Review = require('./models/review.model');

const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./tokenValidationMiddleware');
const bcrypt = require('bcrypt');

const express = require('express');
const cors = require('cors')

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.CONNECTION_STRING);

app.get('/', async (req, res) => {
  return res.json({
    message: "hemlo world!"
  })
});

app.post('/signup', async (req, res) => {
  try {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
      return res.status(400).json({
        error: true,
        message: "Fields Cannot Be Empty!"
      })
    }

    // $or expects an array of objects
    let isUser = await User.findOne({
      $or: [
        { email },
        { username }
      ]
    });
    if(isUser) {
      console.log(isUser._id);
      return res.status(400).json({
        error: true,
        message: "User Already Exists!"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      error: false,
      userId: user._id,
      token,
      message: 'User Signup Successful.'
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json({
        error: true,
        message: "Field Cannot Be Empty!"
      });
    }

    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({
        error: true,
        message: 'User Not Registered! Please Signup...'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(400).json({
        error: true,
        message: 'Invalid Password!'
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      error: false,
      userId: user._id,
      token,
      message: 'User Login Successful.'
    });
  } catch(err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));