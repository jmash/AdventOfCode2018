const fs = require('fs');
const readline = require('readline');

let rl = readline.createInterface(
    fs.createReadStream('./day6test.txt', 'utf-8')
);

let coordList = [];

rl.on('line', (line) => {
    let coordRE = /(\d+),\s(\d+)/;
    let coords = [];
    coords.push(parseInt(line.match(coordRE)[1]));
    coords.push(parseInt(line.match(coordRE)[2]));
    coordList.push(coords);

}).on('close', closestCoords);

function closestCoords() {
    let map = [];
    console.log(coordList);
}