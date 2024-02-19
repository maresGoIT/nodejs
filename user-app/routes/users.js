const express = require("express");
const router = express.Router();

// Define routes for handling user-related requests
router.get("/", (req, res) => {
  res.send("Get all users");
});

router.post("/", (req, res) => {
  res.send("Create a new user");
});

router.get("/:id", (req, res) => {
  res.send(`Get user with ID: ${req.params.id}`);
});

module.exports = router;
