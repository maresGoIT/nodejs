// const fs = require('fs');
import fs from "fs";
console.log(` # Step 0`);

// Reading from a file synchronously
try {
  const dataSync = fs.readFileSync("cars.txt", "utf8");
  console.log("Synchronous read:", dataSync);
} catch (err) {
  console.error("Error reading file synchronously:", err);
}
console.log(` # Step 1`);

// Reading from a file asynchronously
fs.readFile("cars.txt", "utf8", (err, dataAsync) => {
  if (err) {
    console.error("Error reading file asynchronously:", err);
    return;
  }

  console.log("Asynchronous read:", dataAsync);
});

console.log(` # Step 2`);
