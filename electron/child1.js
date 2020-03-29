process.on('message', (m) => {
    console.log('CHILD got message:', m);
});

let a = 1;
let b = 1;
const sendFibonacci = setInterval(() => {
    process.send(a);
    let next = a + b;
    a = b;
    b = next;
}, 50);

process.on('SIGINT', () => {
    // console.log('Child1 receive SIGINT');
    process.exit();
});

// process.on('SIGHUP', () => {
//     console.log('??????');
// });