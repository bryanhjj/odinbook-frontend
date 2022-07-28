import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../../utils/axios';

// mui setup
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

const UserSearch = () => {
    const [queryStr, setQueryStr] = useState('');
    const [usersList, setUsersList] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get('/users')
        .then((results) => {
            setUsersList(results.data.users);
        })
    }, []);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            const queryArr = queryStr.split(' ');
            const userQuery1 = queryArr[0];
            const userQuery2 = queryArr[1];
            axios
            .post('/users/search', {userQuery1, userQuery2})
            .then((results) => {
                if (results.data.user) {
                    // tempted to try something else for this
                    navigate(`/users/${results.data.user._id}`);
                } else {
                    setError(results.data.error);
                    setTimeout(() => {
                        setError(null);
                    }, 5000);
                }
            });
        }
    };

    const handleSearchBtnClick = () => {
        const queryArr = queryStr.split(' ');
        const userQuery1 = queryArr[0];
        const userQuery2 = queryArr[1];
        axios
        .post('/users/search', {userQuery1, userQuery2})
        .then((results) => {
            if (results.data.user) {
                // tempted to try something else for this
                navigate(`/users/${results.data.user._id}`);
            } else {
                setError(results.data.error);
                setTimeout(() => {
                    setError(null);
                }, 5000);
            }
        });
    }

    if (!usersList) {
        return <div>Loading...</div>
    };

    return (
        <Box>
            <Typography variant="h5">
                Search for another user
            </Typography>
            <TextField
                sx={{width: '90%', marginLeft: '8px'}}
                id="outlined-search"
                label="Username"
                type="search"
                onChange={(e) => setQueryStr(e.target.value)}
                onKeyPress={handleKeyPress}
                value={queryStr}
            />
            <IconButton onClick={handleSearchBtnClick} sx={{marginLeft: '8px', paddingTop: '9px'}}>
                <SearchIcon fontSize="large"/>
            </IconButton>
            {error && (
                <div>
                    <Typography variant="body1">
                        {error}
                    </Typography>
                </div>
            )}
        </Box>
    );
};

export default UserSearch;