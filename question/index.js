// Import the readline module
const readline = require("readline");

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask the user for their name
rl.question("Care e numele tau? ", (name) => {
  // Once the user responds, greet them
  console.log(`Salut, ${name}!`);

  rl.question("Ce varsta ai? ", (age) => {
    checkAge(age);
  });
});

// Listen for the 'close' event
rl.on("close", () => {
  console.log("Salut!");
});

function checkAge(age) {
  if (parseInt(age) >= 18) {
    console.log("Esti adult.");
  } else {
    console.log("Nu esti adult.");
  }
}
