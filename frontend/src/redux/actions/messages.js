export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_MESSAGES = 'SET_MESSAGES';

export const addMessage = (message) => {
    return ({
        type: ADD_MESSAGE,
        message
    });
}

export const setMessages = (messages, channel) => {
    return ({
        type: SET_MESSAGES,
        messages,
        channel
    });
}