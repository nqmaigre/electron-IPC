const child_process = require('child_process');
const fork = child_process.fork;

const child1 = fork(`${__dirname}/child1.js`);
const child2 = fork(`${__dirname}/child2.js`);
const child3 = fork(`${__dirname}/child3.js`);

const isPrime = (n) => {
    for(let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
        if(n % i === 0) {
            return false;
        } 
    }
    return true;
};

const printParent = (data) => {
    console.log('parent: ', data);
};
const printChild1 = (data) => {
    console.log('child1: ', data);
};
const printChild2 = (data) => {
    console.log('child2: ', data);
};
const printChild3 = (data) => {
    console.log('child3: ', data);
};
const printLog = (data) => {
    console.log('Log: ', data);
};


child1.on('message', (m) => {
    printChild1(m);
});

child2.on('message', (m) => {
    printChild2(m);
});

child3.on('message', (m) => {
    printChild3(m);
});

let count = 2;
const getPrime = setInterval(() => {
    if(isPrime(count)) {
        printParent(count);
    }
    count++;
}, 30);

process.on('SIGINT', () => {
    clearInterval(getPrime);
    if(child1) {
        child1.kill('SIGINT');
    }
    if(child2) {
        child2.kill('SIGINT');
    }
    if(child3) {
        child3.kill('SIGINT');
    }
});

child1.on('exit', () => {
    printLog('Child1 exited.');
});

child2.on('exit', () => {
    printLog('Child2 exited.');
});

child3.on('exit', () => {
    printLog('Child3 exited.');
});