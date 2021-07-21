import { combineReducers } from "redux";

const INITIAL_STATE = {
    previousScreen: "Home",
    currentScreen: "Home"
};

const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SWITCH_SCREEN':
            const newState = { ...state, previousScreen: state.currentScreen, currentScreen: action.payload }
            return newState;
        default:
            return state
    }
};

export default combineReducers({
    rootReducer: rootReducer
});