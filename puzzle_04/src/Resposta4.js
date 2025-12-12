const input = require('./input.js');
const array = input.split("\n")
let matrixRolls = []
let marked = 0

for (let x = 0; x < array.length; x++) {
    let arrayRollRow = array[x].split("")
    matrixRolls[x] = []

    for (let y = 0; y < arrayRollRow.length; y++) {
        matrixRolls[x].push(arrayRollRow[y])
    }
}



for (let x = 0; x < matrixRolls.length; x++) {
    for (let y = 0; y < matrixRolls[x].length; y++) {
        isRoll(matrixRolls, x, y)
    }
}


function isRoll(matrix, x, y) {
    let rolos = 0
    if (matrix[x][y] == '@') {
        try {
            if (matrix[x][y + 1] == '@') {
                rolos++
            }
        }
        catch {
        }
        try {
            if (matrix[x][y - 1] == '@') {
                rolos++
            }
        }
        catch {
        }
        try {
            if (matrix[x + 1][y] == '@') {
                rolos++
            }
        }
        catch {
        }
        try {
            if (matrix[x + 1][y + 1] == '@') {
                rolos++
            }
        }
        catch {
        }
        try {
            if (matrix[x + 1][y - 1] == '@') {
                rolos++
            }
        }
        catch {
        }
        try {
            if (matrix[x - 1][y] == '@') {
                rolos++
            }
        }
        catch {
        }
        try {
            if (matrix[x - 1][y - 1] == '@') {
                rolos++
            }
        }
        catch {
        }
        try {
            if (matrix[x - 1][y + 1] == '@') {
                rolos++
            }
        }
        catch {
        }
    }
    if (rolos <= 3 && matrix[x][y] == '@') {
        marked++
    }
}




console.log(marked)