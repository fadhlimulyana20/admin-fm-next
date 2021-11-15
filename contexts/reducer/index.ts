import { ActionType, GlobalStateInterface } from "../types";

const Reducer = (state: GlobalStateInterface, action: ActionType) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedUser: action.payload,
                isUserAuthenticated: true,
            }
        case 'LOGOUT':
            return {
                ...state,
                loggedUser: null,
                isUserAuthenticated: false,
            }
        default:
            return state;
    }
};

export default Reducer;