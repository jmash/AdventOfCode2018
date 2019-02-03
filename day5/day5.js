const fs = require('fs');
const readline = require('readline');

let rl = readline.createInterface(
    fs.createReadStream('./day5test.txt', 'utf-8')
);

let polymer = "";

rl.on('line', (line) => {
    polymer = line;
}).on('close', polymerReaction);

function polymerReaction() {
    let flag = true;
    
    while(flag) {
        flag = false;
        for(let i = 0; i < polymer.length - 1; i++) {
            if((polymer[i].toLowerCase() === polymer[i+1].toLowerCase()) &&
            (polymer[i] !== polymer[i+1])) {
                polymer = polymer.slice(0, i).concat(polymer.slice(i+2));
                flag = true;
            }
        }
    }
    console.log(polymer.length);    
}

function polymerREFunc() {
    let polymerRE = /(.)(.)/g;
    polymer = polymer.replace(polymerRE, (match, $1, $2) => {
        console.log(polymerRE.lastIndex);
        if($1 !== $2 && $1.toLowerCase() === $2.toLowerCase()) {
            return "";
        }
        return match;
    });
    console.log(polymer);
    // console.log(polymerRE.exec(polymer));
}