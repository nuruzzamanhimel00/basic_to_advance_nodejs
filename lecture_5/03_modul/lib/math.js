function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

const defaultExport = function() {
    console.log("This is a math module");
};

const test = () => {
    console.log("This is a test function");
};

module.exports = Object.assign(defaultExport, {
    add,
    subtract,
    multiply,
    divide,
    test
});