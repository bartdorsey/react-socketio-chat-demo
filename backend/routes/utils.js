const { Channel, Message } = require('../db/models');

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const addMessageToChannel = async (nickName, channelId, messageContent) => {
  console.log(channelId, messageContent);
  try {
    const channel = await Channel.findByPk(channelId);
    const message = await Message.create({
      text: messageContent,
      nickName,
    });
    message.setChannel(channel);
    await message.save();
    return {
        message,
        channel: await message.getChannel()
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
    asyncHandler,
    addMessageToChannel
};