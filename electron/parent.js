// const ipcRenderer = require('electron').ipcRenderer;
const child_process = require('child_process');
const fork = child_process.fork;

const isPrime = (n) => {
    for(let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
        if(n % i === 0) {
            return false;
        } 
    }
    return true;
};

const sendToMain = (data) => {
    ipcRenderer.send('procs-message', data);
};

let parentContinue = true;
const startParentTask = () => {
    let num = 2;
    const nextTickTask = () => {
        if(isPrime(num)) {
            sendToMain({
                type: 'parent',
                content: num
            });
        }
        num++;
        if(parentContinue) {
            setImmediate(nextTickTask);
        }
    };
    setImmediate(nextTickTask);
};

const createChildProcs = () => {
    const child1 = fork(`${__dirname}/child1.js`);
    const child2 = fork(`${__dirname}/child2.js`);
    const child3 = fork(`${__dirname}/child3.js`);

    child1.on('message', (m) => {
        sendToMain({
            type: 'child1',
            content: m
        });
    });
    child2.on('message', (m) => {
        sendToMain({
            type: 'child2',
            content: m
        });
    });
    child3.on('message', (m) => {
        sendToMain({
            type: 'child3',
            content: m
        });
    });

    child1.on('exit', () => {
        sendToMain({
            type: 'log',
            content: 'Child1 exited.'
        });
    });
    child2.on('exit', () => {
        sendToMain({
            type: 'log',
            content: 'Child2 exited.'
        });
    });
    child3.on('exit', () => {
        sendToMain({
            type: 'log',
            content: 'Child3 exited.'
        });
    });

    // return {
    //     child1: child1,
    //     child2: child2,
    //     child3: child3
    // };
    return [child1, child2, child3];
};

// createChildProcs();

let childProcs = null;
ipcRenderer.on('procs-start', () => {
    childProcs = createChildProcs();
    parentContinue = true;
    startParentTask();
});

ipcRenderer.on('procs-stop', () => {
    parentContinue = false;

    for(eachChildProc of childProcs) {
        if(eachChildProc) {
            eachChildProc.kill('SIGKILL');
        }
    }
    childProcs = null;
});