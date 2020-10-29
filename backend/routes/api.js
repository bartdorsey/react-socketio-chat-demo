const express = require('express');
const channelsRouter = require("./api/channels");

const api = express.Router();

api.use('/channels', channelsRouter);

module.exports = api;