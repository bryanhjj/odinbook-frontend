import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import LoginForm from "./LoginForm";

// mui setup
import Box from '@mui/material/Box';

const Login = ({user, setUser}) => {
    const navigate = useNavigate();
    const [errors, setErr] = useState([]);
    const [registerErrors, setRegErrors] = useState([])

    const handleLogin = (username, password) => {
        axios.post('/auth/login', {username, password})
        .then((results) => {
            const user = {
                first_name: results.data.user.first_name,
                last_name: results.data.user.last_name,
                username: results.data.user.username,
                email: results.data.user.email,
                phone_number: results.data.user.phone_number,
                profile_pic: results.data.user.profile_pic,
                id: results.data.user.id,
                token: results.data.user.token,
            };
            axios.defaults.headers.common['Authorization'] = results.data.token.token;
            setUser(user);
            navigate('/');
        }).catch((err) => {
            if (err) {
                setErr(err.response.data.errors);
                setTimeout(() => {
                    setErr({});
                }, 3000);
            } else if (err.response.data.message) {
                setErr([...errors, {msg: err.response.data.message}]);
                setTimeout(() => {
                    setErr([]);
                }, 3000);
            }
        });
    }

    const handleRegister = (first_name, last_name, username, password, email, phone_number, confirm_password) => {
        axios.post('/auth/register', {first_name, last_name, username, password, email, phone_number, confirm_password})
        .then((results) => {
            const user = {
                first_name: results.data.user.first_name,
                last_name: results.data.user.last_name,
                username: results.data.user.username,
                email: results.data.user.email,
                phone_number: results.data.user.phone_number,
                profile_pic: results.data.user.profile_pic,
                id: results.data.user.id,
                token: results.data.user.token,
            };
        axios.defaults.headers.common['Authorization'] = results.data.token.token;
        setUser(user);
        navigate('/');
        })
        .catch((err) => {
            if (err.response.data.errors) {
                console.log(err);
                setRegErrors(err.response.data.errors);
                setTimeout(() => {
                    setRegErrors([]);
                }, 3000);
            } else if (err.response.data.message) {
                console.log(err);
                setRegErrors([...registerErrors, {msg: err.response.data.message}]);
                setTimeout(() => {
                    setRegErrors([]);
                }, 3000);
            }
        });
    }

    const handleFBLogin = (accessToken) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        axios.post('/auth/facebook/token')
        .then((results) => {
            const user = {
                first_name: results.data.user.first_name,
                last_name: results.data.user.last_name,
                username: results.data.user.username,
                email: results.data.user.email,
                phone_number: results.data.user.phone_number,
                profile_pic: results.data.user.profile_pic,
                id: results.data.user.id,
                token: `Bearer ${accessToken}`,
                facebookId: results.data.user.facebookId
            };
            setUser(user);
            navigate('/');
        })
    }

    return (
        <Box                 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 'auto',
        }}>
            <LoginForm 
                handleLogin = {handleLogin}
                handleFBLogin = {handleFBLogin}
                handleRegistration = {handleRegister}
            />
        </Box>
    )
};

export default Login;