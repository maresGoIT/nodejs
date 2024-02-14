// node index.js arg1 arg2 arg3
// console.dir(process.argv);

// a + b
if (process.argv.length < 5) {
  console.log("Pentru rezultat avem nevoie de trei argumente.");

  return;
}

/*
node.js index.js 13 14 -add
node.js index.js 13 14 -sub
node.js index.js 13 14 -mul
node.js index.js 13 14 -div
*/

const OPERATII = ["-add", "-sub", "-mul", "-div"];

try {
  const firstNumber = parseInt(process.argv[2]);
  const secondNumber = parseInt(process.argv[3]);
  const operation = process.argv[4];

  if (!OPERATII.includes(operation)) {
    console.error(
      `Aceasta operatie nu este cunoscuta. Poti folosi ca valori doar ${OPERATII}`
    );
  }

  let result = 0;
  switch (operation) {
    case "-add":
      result = firstNumber + secondNumber;
      console.log(
        `Rezultatul adunarii dintre ${firstNumber} si ${secondNumber} este ${result}.`
      );
      break;

    case "-sub":
      result = firstNumber - secondNumber;
      console.log(
        `Rezultatul scaderii dintre ${firstNumber} si ${secondNumber} este ${result}.`
      );
      break;

    case "-div":
      result = firstNumber / secondNumber;
      console.log(
        `Rezultatul impartirii dintre ${firstNumber} si ${secondNumber} este ${result}.`
      );
      break;

    case "-mul":
      result = firstNumber * secondNumber;
      console.log(
        `Rezultatul inmultirii dintre ${firstNumber} si ${secondNumber} este ${result}.`
      );
      break;
  }
} catch (error) {
  console.error("A aparut o eroare la calcul.");
}
