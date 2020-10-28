import { ADD_MESSAGE } from "./actions";

const reducer = (state = { messages: {} }, action) => {
    Object.freeze(state);
    const next = { ...state };
    console.log(next);
    switch (action.type) {
        case ADD_MESSAGE:
            const newMsg = {
                id: action.msgId,
                text: action.msg,
            }
            next.messages[action.msgId] = newMsg;
            return next;
        default:
            return state;
    }
}

export default reducer;