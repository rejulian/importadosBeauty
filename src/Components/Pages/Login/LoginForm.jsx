import React, { useContext, useState } from 'react'
import Google from '../../../images/google.webp'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from 'react-router-dom';
import { onSignIn, onSignInWithGoogle, db } from '../../../firebaseConfig';
import {collection, doc, getDoc} from "firebase/firestore"
import './Auth.css'
import { AuthContext } from '../../../Context/AuthContext';

const LoginForm = () => {
    const navigate = useNavigate()
    const {loginContext} = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: ""
    });

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleChange = (e) => {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await onSignIn(userCredentials);
            if(res.user){
                const userCollection = collection(db, "users")
                const userRef = doc(userCollection, res.user.uid)
                const userDoc = await getDoc(userRef)
                const finalUser = {
                    email: res.user.email,
                    role: userDoc.data().role
                }
                console.log(finalUser)
                loginContext(finalUser)
                navigate('/')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleLoginWithGoogle = async (e) => {
        try {
            const res = await onSignInWithGoogle();
            if(res.user){
                navigate('/')
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleLogin} className='auth-form'>
            <h1>Iniciar sesion</h1>
            <TextField onChange={handleChange} name='email' label='Email' fullWidth />
            <FormControl variant='outlined'>
                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                <OutlinedInput
                    onChange={handleChange}
                    name='password'
                    id='outlined-adornment-password'
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label='toggle password visibility'
                                edge="end"
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? (
                                    <VisibilityOff color='primary' />
                                ) : (
                                    <Visibility color='primary' />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Contraseña"
                />
            </FormControl>
            <Button type='submit' variant='contained' fullWidth>Iniciar sesion</Button>
            <Button onClick={handleLoginWithGoogle} className='btn-google' variant='outlined' fullWidth>
                <img className='icon' src={Google} alt="" />
                Ingresa con Google
            </Button>
            <Link className='links' to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            <Link className='links' to="/register">¿No tienes cuenta? Registrate</Link>

        </form>
    )
}

export default LoginForm