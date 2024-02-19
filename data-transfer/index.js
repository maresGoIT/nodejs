const express = require("express");
const app = express();
const path = require("path");

// Example of a logging middleware function
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  next(); // Pass control to the next middleware function
};

app.use(loggerMiddleware);

// // Route handling for GET request with route parameters
// app.get("/api/users/:id", (req, res) => {
//   const userId = req.params.id;
//   res.send(`User ID: ${userId}`);
// });

// Route handling for GET request with route parameters
app.get("/api/location/:location/users/:id", (req, res) => {
  const city = req.params.location;
  const userId = req.params.id;
  console.log(`Request has city ${city} and userId: ${userId}`);
  res.send(`User ID: ${userId}`);
});

app.get("/api/users/create", (req, res) => {
  const options = {
    root: path.join(__dirname),
  };

  const fileName = "form.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

app.use(express.json());

// Route handling for POST request with request body
app.post("/api/users/create", (req, res) => {
  console.dir(req.body);
  //const { username, email } = req.body;
  // Process the received data
  //res.send(`Username: ${username}, Email: ${email}`);
  res.status(200);
  res.send("User has been created.");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
