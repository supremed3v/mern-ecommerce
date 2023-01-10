import React, { useState } from 'react'
import { Typography, Grid, Box, Button, TextField } from '@mui/material'
import { useAlert } from 'react-alert'
import { useAuthContext } from '../context/AuthContext'
import { useEffect } from 'react'


const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const alert = useAlert()
    const { forgotPassword, authState } = useAuthContext()

    const handleSubmit = () =>{
        const myForm = new FormData()

        myForm.set('email', email)
        forgotPassword(myForm)
    }

    useEffect(()=>{
        if(authState.error){
            alert.error(authState.error)
        }
        if(authState.successMessage){
            alert.success(authState.successMessage)
        }
    },[authState.error, authState.successMessage, alert])

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>

            <Grid item xs={12} sm={6} md={4} sx={{ border: '1px solid white', p: 2 }}>
                <Typography variant="h4" sx={{ textAlign: 'center' }}>Forgot Password</Typography>
                <Typography
                    variant='subtitle1'
                    sx={{ textAlign: 'left', color: '#e7e7e7e7' }}

                >
                    Enter your email address and we'll send you a link to reset your password.
                </Typography>
                <Box sx={{ mt: 2, bgcolor: "white" }} >
                    <TextField
                        fullWidth
                        label="Email"
                        variant="filled"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                    />
                    
                </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        Send Reset Link
                    </Button>
            </Grid>
        </Grid>
    )
}

export default ForgotPassword