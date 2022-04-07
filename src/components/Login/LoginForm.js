import React, { useState } from "react";
import Registration from "./Registration";
import Facebook from "./Facebook";

// mui setup for LoginForm
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(null);

    const handleKeyPress = (event) => {
        if (event.key == 'Enter') {
            handleClick();
        }
    }

    const handleClick = () => {
        props.handleLogin(username, password);
        setUsername('');
        setPassword('');
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
                    label="Username"
                    defaultValue=""
                    onChange = {(e) => setUsername(e.target.value)}
                    value={username}
                />
                <TextField
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
                <Facebook handleFBLogin={props.handleFBLogin} />
                <Registration handleRegistration={props.handleRegistration}/>
            </div>
        </Box>
    )
}

export default LoginForm;