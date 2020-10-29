export const ADD_CHANNELS = "ADD_CHANNELS";
export const SET_CURRENT_CHANNEL = "SET_CURRENT_CHANNEL";
export const ADD_JOINED_CHANNEL = "ADD_JOINED_CHANNEL";

export const addChannels = (channels) => {
  return {
    type: ADD_CHANNELS,
    channels,
  };
}

export const setCurrentChannel = (channel) => {
    return {
        type: SET_CURRENT_CHANNEL,
        channel
    };
}

export const addJoinedChannel = (channel) => {
    return {
        type: ADD_JOINED_CHANNEL,
        channel
    }
}