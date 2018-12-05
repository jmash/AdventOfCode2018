const fs = require('fs');
const readline = require('readline');
const moment = require('moment');
const _ = require('lodash');

let rl = readline.createInterface(
    fs.createReadStream('./day4input.txt', 'utf-8')
);

let guardSched = [];
let guardRoster = {};

rl.on('line', (line) => {
    guardSched.push(line);
}).on('close', main);

function main() {
    guardSched = guardSched.sort();
    let checkForGuardRE = /Guard\s#(\d+)/;
    let checkAsleepRE = /asleep/;
    let checkWakesRE = /wakes/;
    let getTimeRE = /\[(\d+-\d+-\d+\s\d+:\d+)\]/;
    
    //populate guard roster with ids
    for(el in guardSched) {
        console.log(guardSched[el]);
        // if the line has the word guard,
        if(guardSched[el].match(checkForGuardRE)) {
            // grab the id and put it into the guard roster object
            console.log("has guard");
            guardRoster.push(guardSched[el].match(getTimeRE)[1]);
        }
    }
}