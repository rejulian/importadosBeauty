import React from 'react'
import { Box } from '@mui/material'
import LoginForm from './LoginForm'

const Login = () => {
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
            <LoginForm/>
        </Box>
    )
}

export default Login