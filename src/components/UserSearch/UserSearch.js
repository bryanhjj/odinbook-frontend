import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../../utils/axios';

// mui setup
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const UserSearch = () => {
    const [queryStr, setQueryStr] = useState('');
    const [usersList, setUsersList] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get('/users')
        .then((results) => {
            setUsersList(results.users);
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
        <div>
            <Typography variant="h5">Search for another user</Typography>
            <TextField
                id="outlined-search"
                label="User name"
                type="search"
                onChange={(e) => setQueryStr(e.target.value)}
                onKeyPress={handleKeyPress}
                value={queryStr}
            />
            <IconButton onClick={handleSearchBtnClick}>
                <SearchIcon/>
            </IconButton>
            {error && (
                <div>
                    <Typography variant="body1">
                        {error}
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default UserSearch;