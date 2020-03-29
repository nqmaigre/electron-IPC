process.on('message', (m) => {
    console.log('CHILD got message:', m);
});

let count = 0;
const sendSquare = setInterval(() => {
    if(count === 200) {
        clearInterval(sendSquare);
        process.exit();
    } else {
        process.send(Math.random());
    }
    count++;
}, 100);

process.on('SIGINT', () => {
    // console.log('Child3 receive SIGINT');
    process.exit();
});