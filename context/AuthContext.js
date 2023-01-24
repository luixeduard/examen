import { createContext, useContext, useReducer } from "react";
import { authConstants } from "./Constants";

const Store = createContext();

const reducer = (state, action) => {

    console.log(action);
    
    switch (action.type) {
        case authConstants.LOGIN_REQUEST: {
            return {
                ...state,
                user: {
                    authenticating: true,
                    ...state.user
                }
            }
        }
        case authConstants.LOGIN_SUCCESS: {
            return {
                ...state,
                user: {
                    ...action.payload,
                    authenticating: false,
                    authenticated: false
                }
            }
        }
        case authConstants.LOGIN_SUCCESS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    error: action.payload,
                }
            }
        }
        case authConstants.LOGIN_SUCCESS:
        case authConstants.LOGIN_FAILURE:
        default:
            {
                return state;
            }
    }
}

export const useStore = () => useContext(Store);

export const StoreProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, {
        user: {
            authenticated: false,
            authenticating: false,
            error: null
        }
    });
    
    return (
        <Store.Provider value={[state, dispatch]}>
            {children}
        </Store.Provider>
    );
}