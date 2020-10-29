import { ADD_MESSAGE } from "../actions/messages";
import { ADD_MESSAGES } from "../actions/messages";

const messagesReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case ADD_MESSAGE:
            return [
                ...state,
                action.message
            ];
        case ADD_MESSAGES:
            return action.messages;
        default:
            return state;
    }
}

export default messagesReducer;