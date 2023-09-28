import React , {useState} from 'react'
import { TextField, Button } from '@mui/material'
import { forgotPassword } from '../../../firebaseConfig'
import { Link } from 'react-router-dom'
import '../Login/Auth.css'

const ForgotPasswordForm = () => {

    const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await forgotPassword(email)
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <form onSubmit={handleSubmit} className='auth-form'>
        <h1>¿Olvidaste tu contraseña?</h1>
        <p>Te enviaremos un email para que puedas restablecerla</p>
        <TextField onChange={e=>setEmail(e.target.value)} name='email' label='Email' fullWidth />
        <Button type='submit' variant='contained' fullWidth>Enviar</Button>
        <Link className="links" to="/login">¿Recuerdas la contraseña? Incia sesion</Link>
    </form>
  )
}

export default ForgotPasswordForm