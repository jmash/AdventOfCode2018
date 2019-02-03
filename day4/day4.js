const fs = require('fs');
const readline = require('readline');
const moment = require('moment');
const _ = require('lodash');

let rl = readline.createInterface(
    fs.createReadStream('./day4test.txt', 'utf-8')
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
    let getMinRE = /:(\d+)\]/;
    let guardNum = 0;

    //populate guard roster with ids
    for(el in guardSched) {
        console.log(guardSched[el]);
        
        // if the line has the word guard,
        if(guardSched[el].match(checkForGuardRE)) {
            // grab the id and put it into the guard roster object
            guardNum = checkForGuardRE.exec(guardSched[el])[1];            
            if(!guardRoster["guard" + guardNum]) {
                guardRoster["guard" + guardNum] = [];
            }
        }
        if(guardSched[el].match(checkAsleepRE) || guardSched[el].match(checkWakesRE)) {
            guardRoster["guard" + guardNum].push(parseInt(getMinRE.exec(guardSched[el])[1]));
        }
    }
    let sleepiestGuard = "";
    for(guard in guardRoster) {
        console.log(guardRoster[guard]);
        console.log(_.chunk(guardRoster[guard], 2));
    }
}