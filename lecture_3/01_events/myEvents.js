const EventEmitter = require('node:events');

const myEmitter = new EventEmitter();

myEmitter.on('himel-event', (message) => {
  console.log('an event occurred!', message);
});
myEmitter.on('himel-event', (message) => {
  console.log('an event occurred!', message);
});

myEmitter.once('push-notify-event', (message) => {
  console.log('push-notify-event only once', message);
});


// myEmitter.emit('himel-event','hello world');
// myEmitter.emit('push-notify-event','hello world');
// myEmitter.emit('push-notify-event','hello world');
// myEmitter.emit('himel-event','hello world');
// myEmitter.emit('push-notify-event','hello world');
// myEmitter.emit('himel-event','hello world');

// const myListener = () => console.log('this is a listener');

// myEmitter.on('test-event', myListener);
// myEmitter.emit('test-event');
// myEmitter.emit('test-event');
// myEmitter.emit('test-event');
// myEmitter.removeListener('test-event', myListener);
// myEmitter.emit('test-event');
console.log("----------------------")

console.log(myEmitter.listeners('himel-event'));