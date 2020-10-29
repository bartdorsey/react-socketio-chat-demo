const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const morgan = require('morgan');
const cors = require('cors');
const { addMessageToChannel } = require('./routes/utils');
const { Channel } = require("./db/models");
const { port } = require('./config'); 
const { Socket } = require('dgram');

// Setup socket.io to work with express
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Setup middleware
app.use(express.json())
app.use(cors());
app.use(morgan('dev'));

// Use our api routes
app.use("/api", apiRouter);

// Now setup socket.io server to listen
// for connections:
io.on('connection', async (socket) => {
    console.log(`${socket.id} -- Connected`);

    // When we get a message on the 'join' room
    // Get the channel from the database
    // and then join the socket to the channel
    // This makes it so that messages to this
    // channel will flow back to the user's connection
    socket.on('join', async (channelId) => {
        const channel = await Channel.findByPk(channelId);
        if (channel) {
            socket.join(channel.id, async () => {
                console.log(`${socket.id} has joined ${channel.name}`);
            });
        }
    });

    // When we get a message on the 'leave' room
    // Get the channel from the database
    // and then tell the socket we have left that
    // channel
    socket.on('leave', async (channelId) => {
        console.log(channelId);
        const channel = await Channel.findByPk(channelId);
        if (channel) {
            socket.leave(channel.id, async () => {
                console.log(`${socket.id} has joined ${channel.name}`);
            });
        }
    });

    // When the socket disconnects, log something to the console.
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    });

    // Find all the channels in the database
    const channels = await Channel.findAll();

    // Loop through all the channels and setup listeners
    // to messages from all the channels.
    for (let channel of channels) {
        console.log(`listening for messages from ${channel.name}`);
        // When we get a message for a channel
        // 1. Log the message
        // 2. add the new message to the database with the `addMessageToChannel`
        //    helper function
        // 3. Then emit the message to two places, back to the channel
        //    and back to the socket that originally sent the message
        //
        // Note: socket.to only sends messages to OTHER sockets joined to
        // the room. This is why we have to send the message back to the original
        // socket as well.
        socket.on(channel.id, async ({message, nickName}) => {
            console.log(`${channel.name} -- ${nickName} ${message}`);
            const newMessage = await addMessageToChannel(nickName, channel.id, message);
            socket.to(channel.id).emit(channel.id, newMessage);
            socket.emit(channel.id, newMessage);
        });
    }
});

// Listen on a port!
const server = http.listen(port, function () {
    console.log(`Server Listening on port ${port}`)
});