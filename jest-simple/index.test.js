const calculator = require("./index");

it("returns warning message if wrong parameters are passed", () => {
  expect(calculator(1, 2)).toBe("Nu am gasit operatia.");
});

it("adds 1 + 2 to equal 3", () => {
  expect(calculator(1, 2, "add")).toBe(3);
});

it("multiply 1 * 2 to equal 2", () => {
  expect(calculator(1, 2, "mul")).toBe(2);
});

it("divide 4 / 2 to equal 2", () => {
  expect(calculator(4, 2, "div")).toBe(2);
});
