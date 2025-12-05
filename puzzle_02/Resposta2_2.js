const input = require('./input.js');
const teste = require('./input.js');
const array = teste.split(",")
let res = 0

for(x = 0; x < array.length; x++ ){
    numbers = array[x].split('-')
    for(y = 0 ; Number(numbers[0])+y <= Number(numbers[1]); y++ ){
        num = String(Number(numbers[0])+y)

        
    }
}

console.log(res)

