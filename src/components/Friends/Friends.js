import React, { useState, useEffect } from "react";
import axios from '../../utils/axios';
import axiosFns from "../../utils/axiosFns";
import FriendCard from "./FriendCard";
import FriendRequestCard from "./FriendRequestCard";
import UserSearch from "../UserSearch/UserSearch";

// mui setup
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Friends = ({user}) => {
    const [userFriends, setUserFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const {handleAcceptRequest, handleDenyRequest} = axiosFns({
        userFriends: userFriends,
        setUserFriends: setUserFriends,
        friendRequests: friendRequests,
        setFriendRequests: setFriendRequests,
    });

    useEffect(() => {
        if (user) {
            axios
            .get(`/users/${user.id}`)
            .then((results) => {
            setUserFriends(results.data.user.user.friend_list);
            setFriendRequests(results.data.user.user.friend_req_rec);
            });
        }
    }, [user]);

    return(
        <Container maxWidth="x1" sx={{minHeight: '100vh', marginTop: '10px'}}>
            <Grid container spacing={3} sx={{justifyContent: 'center'}}>
                <Grid item xs={12} md={9}>
                    <UserSearch />
                    {friendRequests ? (
                        <Typography variant="h5">
                            Friend requests received
                        </Typography>
                    ) : null }
                    {friendRequests.length > 0 ? (
                        friendRequests.map((fren) => {
                            return (
                                <FriendRequestCard 
                                    friend={fren}
                                    key={fren._id}
                                    handleAcceptRequest={handleAcceptRequest}
                                    handleDenyRequest={handleDenyRequest}
                                />
                            );
                        })
                    ) : (
                        <Typography variant="body1">
                            You do you have any friend requests at this moment.
                        </Typography>
                    )}
                    <Typography variant="h5">
                        Friends
                    </Typography>
                    {userFriends.length > 0 ? (
                        userFriends.map((fren) => {
                            return (
                                <FriendCard 
                                    friend={fren}
                                    key={fren._id}
                                />
                            );
                        })
                    ) : (
                        <Typography variant="body1">
                            No friends yet!
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Friends;