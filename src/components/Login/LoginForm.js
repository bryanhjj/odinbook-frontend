import React, { useState } from "react";
import Registration from "./Registration";

// mui setup for LoginForm
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(null);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    }

    const handleClick = () => {
        props.handleLogin(username, password);
        setUsername('');
        setPassword('');
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
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
                <h1>Log in to your account</h1>
                <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    onChange = {(e) => setUsername(e.target.value)}
                    value={username}
                />
                <TextField
                    sx={{width: '100%'}}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    onChange = {(e) => setPassword(e.target.value)}
                    value={password}
                    onKeyPress={handleKeyPress}
                />
                {props.err ? props.err.map((er) => {
                    return (
                        <div>
                            {er.msg}
                        </div>
                    )
                }) : null}
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={handleClick}>Login</Button>
                </Stack>
                <Registration handleRegistration={props.handleRegistration}/>
            </Box>
        </ThemeProvider>
    )
}

export default LoginForm;