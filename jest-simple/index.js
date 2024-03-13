function calculator(a, b, op) {
  const opMap = {
    add: () => a + b,
    mul: () => a * b,
    div: () => a / b,
  };

  if (opMap.hasOwnProperty(op)) {
    return opMap[op]();
  }

  //   if (op === "add") {
  //     return a + b;
  //   } else if (op === "mul") {
  //     return a * b;
  //   } else if (op === "div") {
  //     return a / b;
  //   }

  return "Nu am gasit operatia.";
}

module.exports = calculator;
