const f = () => {
    const child = require('child_process').fork('child2.js');
    child.on('message', (m) => {
        console.log(m);
    });

    // return child;
};

f();