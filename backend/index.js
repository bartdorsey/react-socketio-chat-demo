const express = require('express');
const app = express()
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next)
app.use(express.json())
app.use(cors());
app.use(morgan('dev'));
const { Message, Channel } = require('./db/models')

router.get('/channels', asyncHandler(async(req, res) => {
    const channels = await Channel.findAll();
    res.json(channels);
}));

router.get('/channels/:channelName/messages', asyncHandler(async(req, res) => {
    const channel = await getChannelByName(req.params.channelName);
    const messages = await channel.getMessages();
    res.json(messages || []);
}));

router.get('/messages', asyncHandler(async(req, res) => {
    const messages = await Message.findAll();
    res.json(messages);
}));

app.use('/', router)
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const getChannelByName = async(channelName) => {
    return await Channel.findOne({
        where: { name: channelName },
        include: Message
    });
}

const addMessageToChannel = async(nickName, channelName, messageContent) => {
    console.log(channelName, messageContent);
    try {
        const channel = await getChannelByName(channelName);
        const message = await Message.create({
            text: messageContent,
            nickName
        });
        message.setChannel(channel);
        console.log(message);
        await message.save();
        return message;
    } catch (e) {
        console.error(e);
    }
}

io.on('connection', async (socket) => {
    console.log(`${socket.id} -- Connected`);

    socket.on('join', async (channelName) => {
        console.log(`join ${channelName}`);
        const channel = await getChannelByName(channelName);
        if (channel) {
            socket.join(channelName, async () => {
                console.log(`${socket.id} has joined ${channelName}`);
            });
        }
    });

    socket.on('leave', async (channelName) => {
        console.log(channelName);
        const channel = await getChannelByName(channelName);
        if (channel) {
            socket.leave(channelName, async () => {
                console.log(`${socket.id} has joined ${channelName}`);
            });
        }
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    });

    const channels = await Channel.findAll();

    for (let channel of channels) {
        console.log(`Registering socket for ${channel.name}`);
        socket.on(channel.name, async ({message, nickName}) => {
            console.log(`${channel.name} -- ${nickName} ${message}`);
            const newMessage = await addMessageToChannel(nickName, channel.name, message);
            socket.to(channel.name).emit(channel.name, newMessage);
            socket.emit(channel.name, newMessage);
        });
    }
});

http.listen(4000, function () {
    console.log('listening on port 4000')
})