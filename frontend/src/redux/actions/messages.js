export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_MESSAGES = 'ADD_MESSAGES';

export const addMessage = message => {
    return ({
        type: ADD_MESSAGE,
        message
    });
}

export const addMessages = messages => {
    return ({
        type: ADD_MESSAGES,
        messages
    });
}