const ranges = require('./input.js');
const arrayRanges = ranges.split(/[\n-]/).map(Number); // Dar split quando tiver \n ou tiver -
let fresh = 0
let merged = true

while (merged) {
    merged = false
    loopExterno: // Label for break the two for's
    for(x = 0; x < arrayRanges.length; x += 2){
        for(y=0; y < arrayRanges.length; y+=2){
                if (x === y) continue;
                let start1 = arrayRanges[x];
                let end1 = arrayRanges[x+1];
                let start2 = arrayRanges[y];
                let end2 = arrayRanges[y+1];
                if (start1 <= end2 && start2 <= end1) {
                    
                    console.log(`new range: [${start1}-${end1}] // [${start2}-${end2}]`);

                    let newStart = Math.min(start1, start2);
                    let newEnd = Math.max(end1, end2);

                    let lastIndex = Math.max(x, y);
                    let firstIndex = Math.min(x, y);
                    
                    arrayRanges.splice(lastIndex, 2);
                    arrayRanges.splice(firstIndex, 2); 

                    
                    arrayRanges.push(newStart, newEnd);
                    merged = true;
                    break loopExterno;
                }
        }
    }
}

for(x = 0; x < arrayRanges.length; x += 2){
    fresh += arrayRanges[x+1] - arrayRanges[x] +1
}
console.log(arrayRanges)
console.log(fresh)