const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface(
    fs.createReadStream('./day7test.txt', 'utf-8')
);

let orderList = [];

rl.on('line', (line) => {
    let orderRE = /\s(\w)\s[\s|\w]+\s(\w)\s/;
    let orderPair = [];
    orderPair.push(orderRE.exec(line)[1]);
    orderPair.push(orderRE.exec(line)[2]);
    orderList.push(orderPair);
}).on('close', showOrder);

function showOrder() {
    let tree = new Tree('A');
    tree.add('B', 'A', tree.traverseBF);
    tree.add('C', 'A', tree.traverseBF);
    console.log(tree);
    console.log(orderList);
}

class Queue {
    constructor() {
        this.dataStore = [];
    }

    enqueue(el) {
        this.dataStore.push(el);
    }

    dequeue() {
        return this.dataStore.shift()
    }

    front() {
        return this.dataStore[0];
    }

    back() {
        return this.dataStore[this.dataStore.length - 1];
    }
}

class Node {
    constructor(data) {
        this.data = data;
        this.parent = null;
        this.children = [];
    }
}

class Tree {
    constructor(data) {
        let node = new Node(data)
        this._root = node;
    }

    traverseDF(callback) {
        (function recurse(currentNode) {
            for(let i = 0, length = currentNode.children.length; i < length; i++) {
                recurse(currentNode.children[i]);
            }

            callback(currentNode);
        })(this._root);
    }

    traverseBF(callback) {
        let q = new Queue();

        q.enqueue(this._root);

        let currentTree = q.dequeue();

        while(currentTree) {
            for(let i = 0, length =currentTree.children.length; i < length; i++) {
                q.enqueue(currentTree.children[i]);
            }

            callback(currentTree);
            currentTree = q.dequeue();
        }
    }

    contains(callback, traversal) {
        traversal.call(this, callback);
    }

    add(data, toData, traversal) {
        let child = new Node(data),
            parent = null,
            callback = function(node) {
                if (node.data === toData) {
                    parent = node;
                }
            };

        this.contains(callback, traversal);

        if(parent) {
            parent.children.push(child);
            child.parent = parent;
        } else {
            throw new Error('Cannot add to a non-existent parent.');
        }
    }
}