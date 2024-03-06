const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const dotenv = require("dotenv");
const { STANDARD_ROLE } = require("./constants.js");
const protectRoute = require("../middleware/authMiddleware.js");

dotenv.config();
const router = express.Router();
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

router.get("/", async (req, res) => {
  res.status(200).json({ message: "Auth page" });
});

// Signup route /auth/signup
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    // The passsword should never be saved as plain text
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      password: hashedPassword,
      role: STANDARD_ROLE,
    });

    await newUser.save();

    res.status(201).send("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating the user");
  }
});

// Login route // /auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h",
    });

    const filter = { username: user.username };
    const update = {
      $set: {
        token: token,
      },
    };

    await User.findOneAndUpdate(filter, update, {
      upsert: true,
      new: true,
    });

    res.status(200).json({
      token: token,
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Login error");
  }
});

router.get("current", protectRoute, async (req, res) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1]; // Extracting the token

    if (!token) {
      res.status(401).send("Not authorized");
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json({
      user: {
        username: "username",
        role: "standard",
      },
    });
  } catch (error) {
    res.status(500).send("Login error");
  }
});

module.exports = router;
