const batteries = require('./input.js');

lines = batteries.split("\n")
let array
let sum = 0 
let second = 0

for(let line in lines){
        array = String(lines[line]).split("").map(Number) //create an array for each elemente in line
        let highest = Math.max(...array)
        let index = array.indexOf(highest)

        if(index == array.length-1){
            second = highest
            array.splice(index,1)
            highest = Math.max(...array)
            index = array.indexOf(highest)

            sum += Number(String(highest)+String(second))
        }else{
            array.splice(0, index+1)
            second = Math.max(...array)
            sum += Number(String(highest)+String(second))
        }

        
        console.log( line ," ",index)
        console.log(sum)
}