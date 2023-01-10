import React, {useState} from 'react'
import {Grid, TextField, Button, Typography, Box} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useEffect } from 'react'
import {useAlert} from 'react-alert'


const ResetPassword = () => {
    const alert = useAlert()
    const {id} = useParams()
    const navigate = useNavigate()
    const {resetPassword, authState} = useAuthContext()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const handleSubmit = () => {
        
            if(password !== confirmPassword){
                alert.error('Password does not match')
                return
            }
            const myForm = new FormData()
            myForm.set('password', password)
            myForm.set('confirmPassword)', confirmPassword)
            resetPassword(id, myForm)
            console.log(id, password, confirmPassword)
        
    }

    useEffect(()=>{
        if(authState.successMessage === true){
            alert.success('Password reset successfully')
            window.location.href = '/login-signup'
        }

        if(authState.error){
            alert.error(authState.error)
        }
    },[authState.successMessage, authState.error, alert])
    
    return (
        <div>
            <Grid container justifyContent="center" alignItems="center" style={{height: '100vh'}}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant="h4" sx={{textAlign: 'center'}}>Reset Password</Typography>
                    <Box sx={{mt: 2, bgcolor: 'white'}}>
                        <TextField
                            fullWidth
                            label="Password"
                            variant="filled"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            label="Confirm Password"
                            variant='filled'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{mt: 2, mb: 2}}
                            onClick={handleSubmit}
                        >
                            Reset Password
                        </Button>

                </Grid>

            </Grid>
        </div>
    )
}

export default ResetPassword