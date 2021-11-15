import axios, { AxiosResponse } from "axios";
import React, {createContext, useReducer} from "react";
import { backendUrl } from "../middleware/global";
import { JsonResponse } from "../pages/api/global";
import Reducer from './reducer'
import { GlobalStateInterface, ContextType } from "./types";
import Cookies from 'js-cookie';


const initialState: GlobalStateInterface = {
    isUserAuthenticated: false,
    loggedUser: null,
    persistenceType: "sessionStorage"
};

const Store = ({children}: { children: React.ReactNode }): React.ReactElement => {
    const [globalState, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={{globalState, dispatch}}>
            {children}
        </Context.Provider>
    )
};

// function initializeState(token) {

//     axios.get<JsonResponse, AxiosResponse<JsonResponse>>(`${backendUrl}/auth/me`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }).then(res => {
//         initialState.isUserAuthenticated = true
//         initialState.loggedUser = res.data.data
//     }).catch(err => {
//         console.log(err.response)
//     })
// }

export const Context = createContext({} as ContextType);
export default Store;