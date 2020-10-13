var path = require('path')
var test = path.join(__dirname, '../public')

var express = require('express')
var SocketIO = require('socket.io')
var app = express()
var http = require('http')
var port = process.env.PORT || 5000
var server = http.createServer(app)

var io = SocketIO(server)

io.on('connection', (socket) => {
    console.log('user is connected to server');

    // socket.emit('createMessage', {
    //     name: 'Admin',
    //     text: 'hi new User'
    // })

    // socket.broadcast.emit('createMessage', {
    //     name: 'Admin',
    //     text: 'someone join the room'
    // })

    socket.emit('newMessage', {
        name: 'Admin',
        text: 'Welcome to chat app',
        createdAt: new Date().toDateString()
    })

    socket.broadcast.emit('newMessage', {
        name: 'Admin',
        text: 'hi New User!',
        createdAt: new Date().toDateString()
    })



    socket.on('createMessage', (event) => {
            console.log(event);
            io.emit('newMessage', {
                    name: event.name,
                    text: event.text
                })
                // socket.broadcast.emit('newMessage', {
                //     name: event.name,
                //     text: event.text
                // })
        })
        // socket.emit('newMessage', {
        //     name: 'Hadia',
        //     text: 'hi kaisat h aap loog'
        // })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})

app.use('/', express.static(test))

server.listen(port, () => {
    console.log(`you are listining on port ${port}`);
})