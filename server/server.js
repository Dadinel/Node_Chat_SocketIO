var app = require('http').createServer();
var io = require('socket.io')(app);

app.listen(3000, () => {
    console.log("Bem vindo ao bate papo da TOTVS");
});

io.on('connection', function (socket) {
    console.log("Alguém se conectou");

    socket.on("register", (data) => {
        socket.faName = data;
        console.log(socket.faName + " entrou na conversa");
    });

    socket.on('message', (data) => {
        console.log(socket.faName + ": " + data);
        io.emit('broadcast', {
            name: socket.faName,
            message: data
        });
    })
});