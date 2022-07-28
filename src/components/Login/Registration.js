import React, { useState } from "react";

// mui setup for the registration page
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Registration = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const handleClick = () => {
        props.handleRegistration(firstName, lastName, username, password, email, phoneNumber, confirmPassword);
        setFirstName('');
        setLastName('');
        setUsername('');
        setPassword('');
        setPhoneNumber('');
        setEmail('');
        setConfirmPassword('');
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '35ch' },
                width: {mobile: 100, laptop: 400},
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 'auto',
            }}
            noValidate
            autoComplete="off"
        >
            <h3>Don't have an account? Sign up for free!</h3>
            <TextField
                required
                id="outlined-required"
                label="First Name"
                onChange = {(e) => setFirstName(e.target.value)}
                value={firstName}
            />
            <TextField
                required
                id="outlined-required"
                label="Last Name"
                onChange = {(e) => setLastName(e.target.value)}
                value={lastName}
            />
            <TextField
                required
                id="outlined-required"
                label="Username"
                onChange = {(e) => setUsername(e.target.value)}
                value={username}
            />
            <TextField
                required
                id="outlined-required"
                label="E-mail"
                onChange = {(e) => setEmail(e.target.value)}
                value={email}
            />
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                onChange = {(e) => setPassword(e.target.value)}
                value={password}
            />
            <TextField
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                onChange = {(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
            />
            <TextField
                id="outlined-number"
                label="Phone Number"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange = {(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
            />
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleClick}>Register</Button>
            </Stack>
        </Box>
    )
}

export default Registration;