import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// mui setup
import Avatar from '@mui/material/Avatar';

const UseAvatar = ({user}) => {
    const [initials, setInitials] = useState('');
    // const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setInitials(`${user.first_name[0]} ${user.last_name[0]}`);
        }
    }, [user]);

    /* not used
    const handleAvatarClick = () => {
        navigate(`/users/${user._id}`);
    }
    */

    return (
        <Avatar
            alt={`${user.first_name} ${user.last_name}`}
            src={user.profile_pic ? user.profile_pic : ''}
        >
            {user.profile_pic ? null : initials}
        </Avatar>
    );
};

export default UseAvatar;