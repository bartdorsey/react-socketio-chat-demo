export const ADD_MESSAGE = 'ADD_MESSAGE';

export const addMessage = (msg) => {
    return ({
        type: ADD_MESSAGE,
        msgId: new Date().getTime(),
        msg
    })
}