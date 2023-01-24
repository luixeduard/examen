import { useStore } from "@/context/AuthContext";
import { authConstants } from "@/context/Constants";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

export default function AuthHook({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useStore()

    useEffect(() => {
        const authenticated = state.user.authenticated;
        if (!authenticated) {
            dispatch({ type: authConstants.LOGIN_REQUEST });
            getSession().then(session => {
                console.log(session)
                if (session) {
                    dispatch({
                        type: authConstants.LOGIN_SUCCESS,
                        payload: session
                    });
                } else {
                    dispatch({
                        type: authConstants.LOGIN_FAILURE,
                        payload: session
                    });
                    Router.replace("/")
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }, [])

    return (
        <>{children}</>
    )
}