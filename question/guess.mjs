// Import the readline module
import readline from "readline";

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Ma gandesc la un numar intre 1 si 10...");
const randomNumber = getRandomInt(1, 10);

rl.question("Care e numarul? ", (value) => {
  // Verificam ca utilizatorul a introdus un numar
  if (!Number.isInteger(+value)) {
    console.error("Va trebui sa introduci un numar.");

    return baseCase();
  }

  const number = Number(value);

  if (number < 1 || number > 10) {
    console.log("Numarul trebuie sa fie intre 1 si 10.");

    return baseCase();
  }

  if (number !== randomNumber) {
    console.log("Nu acesta este numarul la care m-am gandit. Mai incearca!");

    return baseCase();
  }

  console.log(`Ai ghicit. Numarul era ${number}`);
});

// Listen for the 'close' event
rl.on("close", () => {
  console.log("Salut!");
});

function baseCase() {
  rl.question("Care e numarul? ", (value) => {
    // Verificam ca utilizatorul a introdus un numar
    if (!Number.isInteger(+value)) {
      console.error("Va trebui sa introduci un numar.");

      return;
    }

    const number = Number(value);

    if (number < 1 || number > 10) {
      console.log("Numarul trebuie sa fie intre 1 si 10.");

      return;
    }

    if (number !== randomNumber) {
      console.log("Nu acesta este numarul la care m-am gandit. Mai incearca!");
    }

    console.log(number);
    console.log(randomNumber);
    console.log(`Ai ghicit. Numarul era ${number}`);
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
