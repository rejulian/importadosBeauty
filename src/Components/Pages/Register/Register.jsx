import React from 'react'
import RegisterForm from './RegisterForm'
import { Box } from '@mui/material'

const Register = () => {
  return (
    <Box sx={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // backgroundColor: theme.palette.secondary.main,
    }}>
        <RegisterForm/>
    </Box>
  )
}

export default Register