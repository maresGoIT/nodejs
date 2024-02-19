import express from "express";
import chalk from "chalk";

// Example of a logging middleware function
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log(chalk.green.bold(req.hostname));

  next(); // Pass control to the next middleware function
};

const authMiddleware = (req, res, next) => {
  console.log(chalk.red.bold("IS Authenticated"));

  next(); // Pass control to the next middleware function
};

// Example of an error handling middleware function
const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
};

// Register middleware functions in Express application
const app = express();

// Use logging middleware
app.use(loggerMiddleware);

// Define routes and route handlers
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Define routes and route handlers
app.get("/test", (req, res) => {
  res.send("Hello Test");
});

// Define routes and route handlers
app.get("/items", authMiddleware, (req, res) => {
  res.send("Hello Items");
});

// http://localhost:3000/items?city=Timisoara&country=RO

// Define routes and route handlers
app.get("/items/:id", (req, res) => {
  res.send("Hello Test");
});

// Use error handling middleware
app.use(errorHandlerMiddleware);

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
