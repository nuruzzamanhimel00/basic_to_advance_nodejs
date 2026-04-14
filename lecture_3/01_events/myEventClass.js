const EventEmitter = require('node:events');

class Chat extends EventEmitter {
    sendMessage(message) {
        console.log('Sending message:', message);
        this.emit('receiveMessage', message);
    }
}

const chat = new Chat();

chat.on('receiveMessage', (message) => {
    console.log('Received message:', message);
});

chat.sendMessage('Hello, World!');