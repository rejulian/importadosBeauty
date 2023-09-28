import React, {useState} from 'react'
import Google from '../../../images/google.webp'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from 'react-router-dom';
import { onSignUp, onSignInWithGoogle, db } from '../../../firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import '../Login/Auth.css'

const RegisterForm = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password : '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value })
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const res = await onSignUp(userCredentials)
            if(res.user){
                await setDoc( doc(db, "users", res.user.uid), {role : "user", email : res.user.email})
                navigate('/')
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSignUpWithGoogle = async () => {
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
    <form onSubmit={handleSignUp} className='auth-form'>
        <h1>Registrate</h1>
        <TextField onChange={handleChange} name='email' label='Email' fullWidth />
        <TextField onChange={handleChange} name='password' label='Contraseña' fullWidth type='password'/>
        <FormControl variant='outlined'>
                <InputLabel htmlFor="outlined-adornment-password">Confirmar contraseña</InputLabel>
                <OutlinedInput
                    onChange={handleChange}
                    name='confirmPassword'
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
            <Button type='submit' variant='contained' fullWidth>Registrarse</Button>
            <Button onClick={handleSignUpWithGoogle} className='btn-google' variant='outlined' fullWidth>
                <img className='icon' src={Google} alt="" />
                Registrate con Google
            </Button>
            <Link className='links' to="/login">¿Ya tienes cuenta? Inicia sesion</Link>

    </form>
  )
}

export default RegisterForm