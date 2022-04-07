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
        userFriends,
        setUserFriends,
        friendRequests,
        setFriendRequests,
    });

    useEffect(() => {
        axios
        .get(`/users/${user.id}`)
        .then((results) => {
            // to modify this to include friend_req_sent
            setUserFriends(results.data.user.friend_list);
            setFriendRequests(results.data.user.friend_req_rec);
        });
    }, [user]);

    return(
        <div>
            <Container maxWidth="x1">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={9}>
                        <Typography variant="h6">
                            Search for other users
                        </Typography>
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
        </div>
    );
};

export default Friends;