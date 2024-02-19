const express = require("express");
const router = express.Router();

// Define routes for handling user-related requests
router.get("/", (req, res) => {
  res.send("Get all items");
});

router.post("/", (req, res) => {
  res.send("Create a new item");
});

router.get("/:id", (req, res) => {
  res.send(`Get item with ID: ${req.params.id}`);
});

module.exports = router;
