import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import axiosFns from "../../utils/axiosFns";
import NewPostFrom from "../Posts/NewPostForm";
import PostContainer from "../Posts/PostContainer";
import FriendsList from "../Friends/FriendList";
import LinkList from "../../LinkList";

// mui setup
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Dashboard = ({user, setUser}) => {
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [userFriends, setUserFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [skip, setSkip] = useState(0);
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
    }

    const {
        getPosts,
        handlePostSend,
        handlePostEdit,
        handlePostDelete,
        handleLikePost,
        handleCommentSend,
        handleCommentEdit,
        handleCommentDelete,
        handleLikeComment,
        handleAcceptRequest,
        handleDenyRequest,
      } = axiosFns({
        posts,
        setPosts,
        user,
        skip,
        setLoadingPosts,
        userFriends,
        setUserFriends,
        friendRequests,
        setFriendRequests,
    });

    useEffect(() => {
        getPosts();
    }, [skip]);

    useEffect(() => {
        if (user) {
            axios
            .get(`/users/${user.id}`)
            .then((results) => {
                setUserFriends(results.data.user.user.friend_list);
                setFriendRequests(results.data.user.user.friend_req_rec);
            })
            .catch((err) => {
                if (err.response && (err.response === 500 || err.response === 401)) {
                    setUser('');
                    navigate('/login');
                };
            });
        };
    }, [user]);

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            setSkip(posts.length);
        }
    };

    return (
        <Container maxWidth="x1">
            <div>
                <Grid container spacing={3}>
                    
                    <Grid item md={3} sx={{display: {xs:'none', md:'block'}, marginTop: '8px'}}>
                        <Paper>
                            <LinkList user={user}/>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{marginTop: '8px'}}>
                        <Paper>
                            <NewPostFrom user={user} handlePostSend={handlePostSend} getPosts={getPosts}/>
                        </Paper>
                        <PostContainer
                            user={user}
                            posts={posts}
                            handlePostEdit={handlePostEdit}
                            handlePostDelete={handlePostDelete}
                            handleCommentSend={handleCommentSend}
                            handleCommentEdit={handleCommentEdit}
                            handleCommentDelete={handleCommentDelete}
                            handleLikePost={handleLikePost}
                            handleLikeComment={handleLikeComment}
                            handleScroll={handleScroll}
                            loading={loadingPosts}
                            getPosts={getPosts}
                        />
                    </Grid>

                    <Grid item md={3} sx={{display: {xs:'none', md:'block'}, marginTop: '8px'}}>
                        <Paper>
                            <FriendsList
                                friends={userFriends}
                                friendReqs={friendRequests}
                                handleAcceptRequest={handleAcceptRequest}
                                handleDenyRequest={handleDenyRequest}
                            />
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        </Container>
    );
};

export default Dashboard;