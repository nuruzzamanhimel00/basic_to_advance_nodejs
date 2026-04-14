const EventEmitter = require('node:events');

const myEmitter = new EventEmitter();

myEmitter.on('errors', (message) =>{
    console.log(`an error occurred! ${message}`);
})

myEmitter.emit('errors', new Error('Something went wrong!'));