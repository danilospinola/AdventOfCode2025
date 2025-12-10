const input = require('./input.js');
const array = input.split("\n")
let res = 0
let conta = ""
let arrayWithoutSpaces = []


for(let x =0 ; x < array.length; x++){

    let numArray = array[x].split(" ")
    arrayWithoutSpaces[x] = []

    for(let y = 0; y< numArray.length; y++){
        if(numArray[y] != "" ){
            arrayWithoutSpaces[x].push(numArray[y]) // Creating a matrix
        }
    }
}

for(y = 0; y<arrayWithoutSpaces[0].length; y++){
    conta = ""
    for(let x =0 ; x<arrayWithoutSpaces.length-1; x++){
        conta += arrayWithoutSpaces[x][y] + arrayWithoutSpaces[arrayWithoutSpaces.length-1][y]
    }
    conta = conta.slice(0,-1)
    res += eval(conta)
}

console.log(res)