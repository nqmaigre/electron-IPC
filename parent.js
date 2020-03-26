var childprocess = require('child_process');
var child = childprocess.fork('./child.js');

console.log('pid of parent:', process.pid);

child.on('message', function(msg) {
  console.log('1:', msg);
})

process.on('message', function(msg) {
  console.log('2:', msg);
})

child.send('---');
process.emit('message', '------');