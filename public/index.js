var socket = io()

socket.on('connect', () => {
    console.log('user is connected')

    socket.on('newMessage', (event) => {
        console.log(event);
    })
})

// socket.emit('createMessage', {
//     name: 'Haider',
//     text: 'Hi Buddy'
// })

socket.on('disconnet', () => {
    console.log('user is disconnected from index');
})