const express = require('express');
const channelsRouter = express.Router();
const { asyncHandler } = require('../utils');
const { Channel, Message } = require('../../db/models');

// Get the list of channels
channelsRouter.get('/', asyncHandler(async(req, res) => {
    const channels = await Channel.findAll();
    res.json(channels);
}));

// Get messages from the messages table for a specific channel
channelsRouter.get('/:channelId/messages', asyncHandler(async(req, res) => {
    const id = parseInt(req.params.channelId);
    const channel = await Channel.findByPk(req.params.channelId, {
        include: Message
    });
    res.json(channel);
}));

module.exports = channelsRouter;