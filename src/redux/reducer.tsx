import initialState from './initialState';

const settingsReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case "TOGGLE_LANGUAGE":
            return {};

        default: return state;
    }
}

export default settingsReducer;