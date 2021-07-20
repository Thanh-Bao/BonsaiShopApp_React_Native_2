import { combineReducers } from "redux";

const INITIAL_STATE = {
    currentScreen: "Home"
};

const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SWITCH_SCREEN':
            const newState = { ...state, currentScreen : action.payload  }
            return newState;
        default:
            return state
    }
};

export default combineReducers({
    rootReducer: rootReducer
});