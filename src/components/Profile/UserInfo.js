import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import axiosFns from "../../utils/axiosFns";
import FriendButtons from "./FriendButtons";

// mui setup
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const UserInfo = ({
    user,
    loggedUser,
    handleFriendReq,
    toggleProfile,
    toggleImage,
}) => {
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
        const filteredFriendsArr = user.friend_list.map((friend) => friend._id);
        setFriendsArr(filteredFriendsArr);
    }, [user]);

    useEffect(() => {
        axios
        .get(`/users/${loggedUser.id}`)
        .then((results) => {
            const loggedUserFriendsReqRec = results.data.user.friend_req_rec.map((friend) => friend._id);
            const loggedFriendReqSent = results.data.user.friend_req_sent.map((friend) => friend._id);
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
        <div>
            <div>
                <img src={user.profile_pic} alt={`${user.first_name} ${user.last_name}'s profile picture`}/>
            </div>
            <div>
                <Typography variant="h5">{`${user.first_name} ${user.last_name}`}</Typography>
                {user._id != loggedUser.id ? (
                    <div>
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
                    </div>
                ) : (
                    <div>
                        <Button variant="contained" onClick={toggleProfile}>Edit profile</Button>
                        <Button variant="contained" onClick={toggleImage}>Change profile picture</Button>
                    </div>
                )}
            </div>
        </div>
    )
};

export default UserInfo;