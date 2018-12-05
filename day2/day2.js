const fs = require('fs');
const readline = require('readline');

let rl = readline.createInterface(
    fs.createReadStream('./day2input.txt', 'utf-8')
);

let twice = 0; let thrice = 0;

rl.on('line', (line) => {
    let letters = {};
    
    // if a letter has not been seen before, initialize it to 1
    // within the letters object, otherwise increment the value
    // at that key.
    for(let i = 0; i < line.length; i++) {
        if(!(letters.hasOwnProperty(line[i]))) {
            letters[line[i]] = 1;
        } else {
            letters[line[i]]++;
        }
    }
    // check to see if any of the keys within the letters object
    // contain values at exactly 2 or 3, and increment either twice
    // or thrice if they do.
    let twiceFlag = false; let thriceFlag = false;
    for(key in letters) {
        if(letters[key] === 2 && !twiceFlag) {
            twice++; twiceFlag = !twiceFlag;
        }
        if(letters[key] === 3 && !thriceFlag) {
            thrice++; thriceFlag = !thriceFlag;
        }
    }
    console.log(twice * thrice);
});