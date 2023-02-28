"use client"

import useAuth from "@/hooks/useAuth"
import axios from "axios"
import { getCookie } from "cookies-next"
import { createContext, useEffect, useState } from "react"
interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    city: string,
}

interface State {
    loading: boolean,
    user: User | null,
    error: null,
}

interface AuthState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<State>>
}
export const AuthenticationContext = createContext<AuthState>({
    loading: true,
    user: null,
    error: null,
    setAuthState: () => { },
})


export default function AuthContext({ children }: { children: React.ReactNode }) {
    const [authState, setAuthState] = useState<State>({
        loading: true,
        user: null,
        error: null,
    })

    const fetchUser = async () => {
        setAuthState({
            user: null,
            error: null,
            loading: true,
        });
        try {
            const jwt = getCookie("jwt")
            if (!jwt) {
                setAuthState({ loading: false, error: null, user: null })
                return
            }
            const res = await axios.get('/api/auth/user', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
            setAuthState({ loading: false, error: null, user: res.data })

        } catch (error: any) {
            setAuthState({ loading: false, error: error.response.data.errorMessage, user: null })
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <AuthenticationContext.Provider
            value={{ ...authState, setAuthState, }}>{children}
        </AuthenticationContext.Provider>
    )
}