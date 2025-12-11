const input = require('./input.js');
const array = input.split("\n")
let splits = []
let res = 0
let matrixSplits = []

for(x=0; x<array.length; x++){
    if(array[x].split("").filter(split => split == "^").length != 0){
        splits.push(array[x].split(""))
    }
}

for(x = 0; x<splits.length; x++){
    matrixSplits[x] = splits[x]
    for(y=0; y<splits.length[x]-1; y++){
       matrixSplits[x].push(splits[y])
    }
    
}

for(x = 0; x<matrixSplits.length; x++){
    for(y = 0; y<matrixSplits[x].length-1; y++){
        if(matrixSplits[x][y] == "^"){
            if(x== 0){
                matrixSplits[x][y-1] = 0
                matrixSplits[x][y+1] = 0 
                res++
            }
            else if(matrixSplits[x-1][y] == 0){
                matrixSplits[x][y-1] = 0
                matrixSplits[x][y+1] = 0 
                res++
            }
        } else if(x != 0 && matrixSplits[x-1][y] == 0  ){
            matrixSplits[x][y] = 0 
        }
    }
}

for(x=0; x<matrixSplits.length; x++){
    console.log(matrixSplits[x])
}

console.log(res)