const defaultExport = require('./lib/math.js');
const { divide, add, subtract, multiply, test } = require('./lib/math.js');

defaultExport(); // This is a math module
test(); // This is a test function

console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2
console.log(multiply(5, 3)); // 15
console.log(divide(5, 3)); // 1.666...