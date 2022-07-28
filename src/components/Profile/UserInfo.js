import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import axiosFns from "../../utils/axiosFns";
import FriendButtons from "./FriendButtons";

// mui setup
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

const UserInfo = ({
    user,
    loggedUser,
    handleFriendReq,
    toggleEditProfile,
    toggleEditImage,
}) => {
    const [initials, setInitials] = useState('');
    const [friendsArr, setFriendsArr] = useState([]);
    const [friendReqSent, setFriendReqSent] = useState([]);
    const [friendReqRec, setFriendReqRec] = useState([]);
    const navigate = useNavigate();

    const {handleAcceptRequest, handleDenyRequest} = axiosFns({
        userFriends: friendsArr,
        setUserFriends: setFriendsArr,
        friendRequests: friendReqRec,
        setFriendRequests: setFriendReqRec,
    });

    useEffect(() => {
        if (user) {
            setInitials(`${user.first_name[0]} ${user.last_name[0]}`);
        }
    }, [user]);

    useEffect(() => {
        const filteredFriendsArr = user.friend_list.map((friend) => friend._id);
        setFriendsArr(filteredFriendsArr);
    }, [user]);

    useEffect(() => {
        axios
        .get(`/users/${loggedUser.id}`)
        .then((results) => {
            const loggedUserFriendsReqRec = results.data.user.user.friend_req_rec.map((friend) => friend._id);
            const loggedFriendReqSent = results.data.user.user.friend_req_sent.map((friend) => friend._id);
            setFriendReqRec(loggedUserFriendsReqRec);
            setFriendReqSent(loggedFriendReqSent);
        });
    }, []);

    const acceptFriendReq = (id) => {
        handleAcceptRequest(id);
        navigate('/temp');
        navigate.goBack();
    };

    const denyFriendReq = (id) => {
        handleDenyRequest(id);
        navigate('/temp');
        navigate.goBack();
    };

    return (
        <Box sx={{color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{
                borderRadius: '50%', 
                height: '150px', 
                width: '150px', 
                border: '1px solid black', 
                marginBottom: 5,
                marginTop: 5, 
                marginLeft: 'auto',
                marginRight: 'auto',
            }}>
                <Avatar
                    alt={`${user.first_name} ${user.last_name}`}
                    src={user.profile_pic ? user.profile_pic : ''}
                    sx={{height: '150px', width: '150px'}}
                >
                    {user.profile_pic ? null : initials}
                </Avatar>
            </Box>
            <Box>
                <Typography variant="h5">
                    {`${user.first_name} ${user.last_name}`}
                </Typography>
                {user._id !== loggedUser.id ? (
                    <Box sx={{marginBottom: '8px'}}>
                        <FriendButtons
                            user={user}
                            friendsArr={friendsArr}
                            friendReqSent={friendReqSent}
                            loggedUser={loggedUser}
                            handleFriendReq={handleFriendReq}
                            friendReqRec={friendReqRec}
                            acceptFriendReq={acceptFriendReq}
                            denyFriendReq={denyFriendReq}
                        />
                    </Box>
                ) : (
                    <Box sx={{marginBottom: '8px'}}>
                        <Button variant="contained" sx={{margin: '10px 10px'}} onClick={toggleEditProfile}>Edit profile</Button>
                        <Button variant="contained" sx={{margin: '10px 10px'}} onClick={toggleEditImage}>Change profile picture</Button>
                    </Box>
                )}
            </Box>
        </Box>
    )
};

export default UserInfo;