const input = require('./input.js');
const array = input.split(",")
let res = 0

for(x = 0; x < array.length; x++ ){
    numbers = array[x].split('-')
    for(y = 0 ; Number(numbers[0])+y <= Number(numbers[1]); y++ ){

        num = String(Number(numbers[0])+y)
        if(num.length % 2 == 0){
            let sub1 = String(num).substring(0, num.length/2)
            let sub2 = String(num).substring((num.length/2))
            if(sub1 == sub2){
                res = res + Number(num)
            } 
        }
    }
}

console.log(res)

