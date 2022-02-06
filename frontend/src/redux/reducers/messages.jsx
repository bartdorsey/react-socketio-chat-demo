import { ADD_MESSAGE } from "../actions/messages";
import { SET_MESSAGES } from "../actions/messages";

const initialState = {};

// Shape of state:
// {
//     <channelId>: [
//         {
//             id: ...,
//             text: ...,
//             nickName: ...,
//             ChannelId: ...,
//             updatedAt: ...
//             createdAt: ...
//         },
//         ...
//     ]
// }

const messagesReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    // Adds a single message to state.<channelId> array.
    // This allows us to keep track of messages per channel
    case ADD_MESSAGE:
      const { message } = action;
      const oldMessages = state[message.ChannelId]
        ? state[message.ChannelId]
        : [];
      return {
        ...state,
        [message.ChannelId]: [...oldMessages, message]
      };
    // This sets all the messages for a channel.
    // Used on first load
    case SET_MESSAGES:
      const { messages, channel } = action;
      return {
        ...state,
        [channel.id]: [...messages]
      };
    default:
      return state;
  }
};

export default messagesReducer;
