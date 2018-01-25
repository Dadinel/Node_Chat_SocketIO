var socket = require('socket.io-client')('http://localhost:3000');
const readline = require('readline');
var colors = require('colors');
var myName = '';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

socket.on('connect', function() {
    rl.question('Qual o seu nome? ', (answer) => {
        myName = answer;
        socket.emit('register', answer);
    });

    rl.on('line', (input) => {
        socket.emit('message', input);
    });
});

socket.on('broadcast', (data) => {
    if( data.name != myName )
        console.log( (data.name + ": " + data.message).green );
});