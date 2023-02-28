import { AuthenticationContext } from '@/app/context/authContext'
import { useContext } from 'react'
import axios from 'axios'
import { getCookie, removeCookies } from 'cookies-next'

const useAuth = () => {
    const { setAuthState } = useContext(AuthenticationContext)

    const signin = async ({ email, password }: { email: string, password: string }, handleClose: () => void) => {
        setAuthState({ loading: true, error: null, user: null })
        try {
            const res = await axios.post('/api/auth/signin', {
                email,
                password
            })
            setAuthState({ loading: false, error: null, user: res.data })
            handleClose()
        } catch (error: any) {
            setAuthState({ loading: false, error: error.response.data.errorMessage, user: null })
        }
    }
    const signup = async ({
        email,
        password,
        firstName,
        lastName,
        phone,
        city
    }: {
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        phone: string,
        city: string
    }, handleClose: () => void) => {
        setAuthState({ loading: true, error: null, user: null })
        try {
            const res = await axios.post('/api/auth/signup', {
                email,
                password,
                firstName,
                lastName,
                phone,
                city
            })
            setAuthState({ loading: false, error: null, user: res.data })
            handleClose()
        } catch (error: any) {
            setAuthState({ loading: false, error: error.response.data.errorMessage, user: null })
        }

    }

    const signout = async () => {
        removeCookies("jwt")
        setAuthState({ loading: false, error: null, user: null })
    }



    return {
        signin,
        signup,
        signout
    }
}

export default useAuth