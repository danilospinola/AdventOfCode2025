const input = require('./input.js');
const array = input.split("\n")
let res = 0
let conta = ""
let arrayWithSpaces = []
let posOp = 0
let op = 0
let changed =false

for(let x =0 ; x < array.length; x++){

    let numArray = array[x].split("")
    arrayWithSpaces[x] = []

    for(let y = 0; y< numArray.length; y++){
        if( x != array.length-1 || (numArray[y] != " " && x == array.length-1 )){ // Operators dont need spaces
            const digits = numArray[y].split('');
            arrayWithSpaces[x].push(...digits) // Creating a matrix
        }
    }
}




for(y = arrayWithSpaces[0].length-1; y >=0; y--){
    posOp = 0
    changed = false
    for(let x = 0 ; x<arrayWithSpaces.length-1; x++){
        if(arrayWithSpaces[x][y] == " "){
            posOp++
        } else{
            posOp = 0
            changed = true
        }
        if(posOp == arrayWithSpaces.length-1){
            console.log(conta)
            res += eval(conta.slice(0, -1));
            conta = "";
            posOp=0
            op++
        }
       if(arrayWithSpaces[x][y] == " "){
            continue
        }
        else{
            conta += arrayWithSpaces[x][y]
        }
        
    }
    if (changed) {
        conta += (
            arrayWithSpaces[arrayWithSpaces.length - 1][
                arrayWithSpaces[arrayWithSpaces.length - 1].length - 1 - op
            ]
        );
    }
}
res += eval(conta.slice(0, -1))

console.log(res)

