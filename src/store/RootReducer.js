import { combineReducers } from "redux";

const INITIAL_STATE = {
    hihi: [
        "hihi1",
        "hihi2",
    ],
};

const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            const {
                hihi
            } = state
            hihi.push(action.payload)
            const newState = { hihi }
            return newState;
        default:
            return state
    }
};

export default combineReducers({
    rootReducer: rootReducer
});