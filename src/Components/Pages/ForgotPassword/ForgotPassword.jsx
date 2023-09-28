import React from 'react'
import { Box } from '@mui/material'
import ForgotPasswordForm from './ForgotPasswordForm'

const ForgotPassword = () => {
  return (
    <Box sx={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding : "20px",
        // backgroundColor: theme.palette.secondary.main,
    }}>
        <ForgotPasswordForm/>
    </Box>
  )
}

export default ForgotPassword