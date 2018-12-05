// test input will be on a 10x10 grid. actual input will
// be 1000x1000

const fs = require('fs');
const readline = require('readline');
const _ = require('lodash');

let rl = readline.createInterface(
    fs.createReadStream('./day3input.txt', 'utf-8')
);

// const testSize = 10;
const realSize = 1000;

let grid = [...Array(realSize)].map(el => Array(realSize).fill(0));

rl.on('line', (line) => {
    let claimSpecs = {
        id: 0,
        startX: 0,
        startY: 0,
        width: 0,
        height: 0
    };
    let claimSpecsRE = /#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/;

    let index = 1;
    for(key in claimSpecs) {
        claimSpecs[key] = parseInt(line.match(claimSpecsRE)[index]);
        index++;
    }

    // QOL name substitutions
    let x = claimSpecs['startX']; let y = claimSpecs['startY'];
    let width = claimSpecs['width']; let height = claimSpecs['height'];
    let id = claimSpecs['id'];
    //rows
    for(let i = y; i < height + y; i++) {
        //cols
        for(let j = x; j < width + x; j++) {
            // when does this not happen?
            
            if(grid[i][j] !== 0 || grid[i][j] === 'O') {
                grid[i][j] = 'O';
            }
            else grid[i][j] = id;
        }
    }
}).on('close', () => {
    findOverlap();
});

function findOverlap() {
    console.log(_.chain(grid).flatten().filter(n => n === 'O').value().length);
}