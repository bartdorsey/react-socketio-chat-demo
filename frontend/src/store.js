
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import messages from './redux/reducers/messages';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    messages
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
