const express = require("express");
const morgan = require("morgan");
const app = express();

// Use Morgan middleware for logging HTTP requests
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Am trimis date de la server spre client");
});

app.get("/test", (req, res) => {
  res.send("Am trimis test");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
