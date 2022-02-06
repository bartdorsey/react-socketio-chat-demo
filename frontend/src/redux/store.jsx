
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import messages from './reducers/messages';
import channels from './reducers/channels';

const composeEnhancers = composeWithDevTools({ trace: true });

const reducers = combineReducers({
    messages,
    channels
});

const configureStore = () => {
    return createStore(
        reducers,
        composeEnhancers(
            applyMiddleware(thunk),
        ),
    );
};

export default configureStore;
