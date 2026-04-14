const EventEmitter = require('node:events');

class ChatRoom extends EventEmitter {

    constructor() {
        super();
        this.users = new Set()  ;
    }

    join(user) {
        this.users.add(user);
        this.emit('joinEvent', user);
    }

    sendMessage(user, message) {
        if (this.users.has(user)) {
            console.log(`sendMessage: ${user} says: ${message}`);
            this.emit('messageEvent', { user, message });
        } else {
            console.log(`${user} is not in the chat room.`);
        }    
    }

    leave(user) {
        if (this.users.has(user)) {
            this.users.delete(user);
            this.emit('leaveEvent', user);
        } else {
            console.log(`${user} is not in the chat room.`);
        }
    }
}

module.exports = ChatRoom;