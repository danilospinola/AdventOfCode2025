const input = require('./input.js');
const teste = require('./input.js');
const array = input.split(",")
let res = 0
let check = true 
array

for(x = 0; x < array.length; x++ ){

    let numbers = array[x].split('-')

    for(y = 0 ; Number(numbers[0])+y <= Number(numbers[1]); y++ ){
        let num = String(Number(numbers[0])+y)
        for(let size = 1; size <= num.length/2  ;size++){
            if(num.length% size == 0){

                for(let z = size; z < num.length; z+=size){
                   if(Number(num.substring(0, size)) !=  Number(num.substring(z, z+size))){                        
                        check = false
                        break
                   }
                }

                if (check){
                    res += Number(num)
                    console.log(num)
                    break
                }
                check = true
            }
        } 
    }

}


console.log(res)

