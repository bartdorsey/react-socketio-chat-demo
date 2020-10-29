import { ADD_JOINED_CHANNEL } from "../actions/channels";
import { SET_CURRENT_CHANNEL } from "../actions/channels";
import { ADD_CHANNELS } from "../actions/channels";

const initialState = {
  channels: [],
  joinedChannels: [],
};

// Shape of state:
// {
//     channels: [
//         {
//             id: ...,
//             name: ...,
//             updatedAt: ...
//             createdAt: ...
//         },
//         ...
//     ],
//     joinedChannels: [<channelId>, ...],
//     currentChannel: <channelId>
// }

const channelsReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case ADD_CHANNELS:
      return { ...state, channels: action.channels };
    case SET_CURRENT_CHANNEL:
      return { ...state, currentChannel: action.channel };
    case ADD_JOINED_CHANNEL:
      return {
        ...state,
        joinedChannels: [...state.joinedChannels, action.channel],
      };
    default:
      return state;
  }
};

export default channelsReducer;
