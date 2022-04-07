import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// mui setup
import Avatar from '@mui/material/Avatar';

const UseAvatar = ({user}) => {
    const [initials, setInitials] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (user) {
            setInitials(`${user.first_name[0]} ${user.last_name[0]}`);
        }
    });

    const handleAvatarClick = () => {
        history.push(`/users/${user._id}`);
    }

    return (
        <Avatar
            alt={`${user.first_name} ${user.last_name}`}
            src={user.profile_pic ? user.profile_pic : ''}
            onClick={handleAvatarClick}
        >
            {`${user.first_name} ${user.last_name}`}
        </Avatar>
    );
};

export default UseAvatar;