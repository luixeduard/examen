import { useStore } from "@/context/AuthContext";
import { authConstants } from "@/context/Constants";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import Swal from "sweetalert2";

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
                    Swal.fire({
                        title: '¡Tu sesión a expirado!',
                        text: 'Volviendo a la pagina de inicio de sesión',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {   
                            Router.replace("/")
                        }                    
                    })
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