const fs = require('fs');
const readline = require('readline');

let rl = readline.createInterface(
    fs.createReadStream('./day1input.txt', 'utf-8')
);

let currFreq = 0;
let seenFreqs = [0];

rl.on('line', (line) => {
    if(line[0] === '+') {
        currFreq += parseInt(line.substring(1));
    } else {
        currFreq -= parseInt(line.substring(1));
    }
    if(checkDups(seenFreqs, currFreq)) 
    seenFreqs.push(currFreq);
});

function checkDups(a, p) {
    for(let i = 0; i < a.length; i++) {
        if (a[i] === p) {
            return true;
        }
    }
    return false;
}