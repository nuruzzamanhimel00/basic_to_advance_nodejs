const ChatRoom = require('./ChatRoom.js');

const chatRoom = new ChatRoom();

chatRoom.on('joinEvent', (user) => {
    console.log(`${user} has joined the chat room.`);
});

chatRoom.on('messageEvent', ({ user, message }) => {
    console.log(`Event : ${user} says: ${message}`);
});

chatRoom.on('leaveEvent', (user) => {
    console.log(`${user} has left the chat room.`);
});

chatRoom.join('Alice');
chatRoom.join('Bob');

console.log('--- JOIND USERS---');
console.log(chatRoom.users);

chatRoom.sendMessage('Alice', 'Hello, everyone!');
chatRoom.sendMessage('Bob', 'Hi, Alice!');

chatRoom.leave('Alice');
console.log('--- LEAVE USERS---');
console.log(chatRoom.users);
chatRoom.sendMessage('Alice', 'Goodbye, everyone!'); // Alice is not in the chat room.
