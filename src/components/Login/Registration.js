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
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const handleClick = () => {
        props.handleRegistration(firstName, lastName, username, password, phoneNumber);
        setFirstName('');
        setLastName('');
        setUsername('');
        setPassword('');
        setPhoneNumber('');
        setEmail('');
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    defaultValue=""
                    onChange = {(e) => setFirstName(e.target.value)}
                    value={firstName}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    defaultValue=""
                    onChange = {(e) => setLastName(e.target.value)}
                    value={lastName}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    defaultValue=""
                    onChange = {(e) => setUsername(e.target.value)}
                    value={username}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="E-mail"
                    defaultValue=""
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
            </div>
        </Box>
    )
}

export default Registration;