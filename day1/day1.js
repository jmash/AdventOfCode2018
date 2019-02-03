const fs = require('fs');
const readline = require('readline');

let rl = readline.createInterface(
    fs.createReadStream('./day1input.txt', 'utf-8')
);

const part1Flag = false; // switch to false for part 2

let freqChanges = [];

rl.on('line', (line) => {
    freqChanges.push(parseInt(line));    
}).on('close', () => {
    if(part1Flag) addList();
    else findDupFreq();
});

function addList() {
    console.log(freqChanges.reduce((a, b) => a + b));
}

function findDupFreq() {
    // initialize list for resultant frequencies
    resFreqs = [];
    // intialize current frequency
    currFreq = 0;
    // start loop to iterate through frequency changes
    for(let i = 0; i < freqChanges.length; i++) {
        // add current frequency to resultant frequency list
        resFreqs.push(currFreq);
        // apply frequency change to current frequency
        currFreq += freqChanges[i];
        // check to see if the updated frequency matches a resultant frequency already listed
        if(checkDups(resFreqs, currFreq)) {
            // if so, log the updated frequency and break the loop
            console.log(currFreq);
            break;
        }
        // if the list ends before finding the duplicate frequency, start loop over
        if(i === freqChanges.length - 1) {
            i = -1;
        }
    }
}

function checkDups(arr, j) {
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] === j) {
            return true;
        }
    }
    return false;
}