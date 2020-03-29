process.on('message', (m) => {
    console.log('CHILD got message:', m);
});

let count = 1;
const sendNum = setInterval(() => {
    if(count > 100000) {
        clearInterval(sendNum);
        process.exit();
    } else {
        process.send(count);
    }
    count++;
}, 10);

process.on('SIGINT', () => {
    // console.log('Child2 receive SIGINT');
    process.exit();
});

// setInterval(() => console.log(process.pid), 100);