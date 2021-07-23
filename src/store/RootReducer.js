import { combineReducers } from "redux";

const INITIAL_STATE = {
    previousScreen: "Home",
    currentScreen: "Home",
    userPhoneLogined: null,
};

const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SWITCH_SCREEN':
            const newState = { ...state, previousScreen: state.currentScreen, currentScreen: action.payload }
            return newState;
        case 'UPDATE_USER_PHONE_LOGINED':
            const newState2 = { ...state, userPhoneLogined: action.payload }
            return newState2;
        default:
            return state
    }
};

export default combineReducers({
    rootReducer: rootReducer
});