const ranges = require('./input.js');
const numbers = require('./input2.js')
const arrayNumbers = numbers.split("\n");
const arrayRanges = ranges.split(/[\n-]/) // Dar split quando tiver \n ou tiver -

let fresh = 0

for(number in arrayNumbers){

    for(x = 0; x < arrayRanges.length; x += 2){
        console.log(x)

    }
}

console.log(fresh)