"use client"

import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AuthModalInputs from './AuthModalInputs';
import useAuth from '@/hooks/useAuth';
import { AuthenticationContext } from '../context/authContext';
import { Alert, CircularProgress } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};



function LoginModal({ isSignin }: { isSignin: boolean }) {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { signin, signup } = useAuth()
    const { error, loading, user, setAuthState } = useContext(AuthenticationContext)

    const renderContent = (singinContent: string, singupContent: string) => {
        return isSignin ? singinContent : singupContent;
    }

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        password: "",
    })

    useEffect(() => {
        if (isSignin) {
            if (inputs.email && inputs.password) {
                return setDisabled(false)
            }
        } else {
            if (inputs.firstName && inputs.lastName && inputs.email && inputs.phone && inputs.city && inputs.password) {
                return setDisabled(false)
            }
        }
        setDisabled(true)
    }, [inputs])

    const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = () => {
        if (isSignin) {
            signin({ email: inputs.email, password: inputs.password }, handleClose)
        } else {
            signup(inputs, handleClose)
        }
    }


    return (
        <>
            <Button className={`${renderContent("bg-blue-400 text-white", "")} border p-1 px-4 rounded mr-3`} onClick={handleOpen}>{renderContent("Sign in", "Sign up")}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={style}>
                    <div className="p-2 h-[600px]">
                        {loading ?
                            <div className="flex justify-center items-center h-[40%]">
                                <CircularProgress className='m-auto' />
                            </div>
                            :
                            <>
                                {error ? <Alert severity="error" className={`mb-4`}>{error}</Alert> : null}
                                <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                                    <p className="text-sm">
                                        {renderContent("Sign in", "Create Account")}
                                    </p>
                                </div>
                                <div className='m-auto'>
                                    <h2 className="text-2xl font-light text-center">
                                        {renderContent("Log into your account", "Create your OpenTable account")}
                                    </h2>
                                    <AuthModalInputs isSignIn={isSignin} inputs={inputs} handleChangeInputs={handleChangeInputs} />
                                    <button type="button" onClick={handleClick} disabled={disabled} className={`uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 ${disabled && 'disabled:bg-gray-400'}`}>
                                        {renderContent("Sign in", "Create Account")}
                                    </button>
                                </div>
                            </>
                        }
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default LoginModal;

