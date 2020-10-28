const express = require('express');
const app = express()
const router = express.Router();
const bodyParser = require('body-parser');
const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next)
app.use(express.json())
const { Message } = require('./db/models')
router.post('/messages', async (req, res) => {
    console.log('Line 6', req.body);
    const msg = req.body;
    const newMsg = await Message.create({
        text: msg
    })
    return newMsg;
})
app.use('/', router)
const http = require('http').createServer(app)
const io = require('socket.io')(http)








io.on('connection', socket => {
    console.log('New Connection')
    socket.on('message', message => {
        io.emit('message', message)
    })
})

http.listen(4000, function () {
    console.log('listening on port 4000')
})