const batteries = require('./input.js');
const lines = batteries.trim().split("\n");
let sum = 0;

for (let line of lines) {
    line = line.trim();
    if (line.length === 0) continue;

    const digits = line.split("").map(Number); // Transform array into array of numbers
    const digitsRemain = 12;
    const toRemove = digits.length - digitsRemain;
    let removedCount = 0;
    
    const stack = [];

    for (let digit of digits) {
        while (stack.length > 0 && digit > stack[stack.length - 1] && removedCount < toRemove) { 
            stack.pop();
            removedCount++;
        }
        stack.push(digit);
    }

    while (stack.length > digitsRemain) {
        stack.pop();
    }

    const numberStr = stack.join("");
    console.log(Number(numberStr));
    
    sum += Number(numberStr);
}

console.log("\nTotal Output Joltage:", sum);