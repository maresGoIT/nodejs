// ES6
import service from "./math.mjs";

// const res = math.add(1, 3);
const res = service.subtract(150, 50);
console.log(`Rezultatul operatiei este ${res}`);
