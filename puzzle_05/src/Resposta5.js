const ranges = require('./input.js');
const numbers = require('./input2.js')
const arrayNumbers = numbers.split("\n").map(Number);
const arrayRanges = ranges.split(/[\n-]/).map(Number); // Dar split quando tiver \n ou tiver -

let fresh = 0

for(number in arrayNumbers){

    for(x = 0; x < arrayRanges.length; x += 2){
        if(arrayNumbers[number] >= arrayRanges[x] && arrayNumbers[number] <= arrayRanges[x+1]){
            console.log(`\n Intervalos: ${arrayNumbers[number]} 1: ${arrayRanges[x]} 2: ${arrayRanges[x+1]}`)
            fresh++
            break
        }
    }
}

console.log(fresh)