import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewPostForm from "../Posts/NewPostForm";
import PostContainer from "../Posts/PostContainer";
import axios from "../../utils/axios";
import axiosFns from "../../utils/axiosFns";
import UserInfo from "./UserInfo";
import EditProfileForm from "./EditProfileForm";
import EditProfilePicForm from "./EditProfilePicForm";

// mui setup
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Profile = ({user, setUser}) => {
    const [relUser, setRelUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [profileEditing, setProfileEditing] = useState(false);
    const [imageEditing, setImageEditing] = useState(false);
    const [skip, setSkip] = useState(0);
    const { userId } = useParams();
    const navigate = useNavigate();

    const {
        getPosts,
        handlePostSend,
        handleLikePost,
        handleCommentSend,
        handleLikeComment,
    } = axiosFns({ posts, setPosts, user, skip, setLoadingPosts });

    useEffect(() => {
        getPosts();
    }, [skip]);

    useEffect(() => {
        axios
          .get(`/users/${userId}`)
          .then((results) => {
            setRelUser(results.data.user.user);
          })
          .catch((err) => {
            if (err.response.status === 500 || err.response.status === 401) {
              setUser("");
              navigate("/login");
            }
          });
    }, [user]);

    const handleFriendReq = (targetUserId) => {
        axios
        .post(`/users/req`, {target_userId : targetUserId})
        .then((results) => {
            axios
            .get(`/users/${userId}`)
            .then((results) => {
                setRelUser(results.data.user.user);
            });
        });
    };

    const handleProfileUpdate = (info) => {
        axios
        .put(`/users/${user.id}`, info)
        .then((results) => {
            const updatedUser = {
                first_name: results.data.user.first_name,
                last_name: results.data.user.last_name,
                email: results.data.user.email,
                phone_number: results.data.user.phone_number,
                id: results.data.user._id,
                token: results.data.token.token,
                profile_pic: results.data.user.profile_pic,
            };
            setUser(updatedUser);
            setRelUser(results.data.user.user);
            axios.defaults.headers.common["Authorization"] = results.data.token.token;
        });
    };

    const handleProfilePicUpdate = (profilePic) => {
        const formData = new FormData();
        formData.append('new_profile_pic', profilePic);
        axios
        .post(`/users/${user.id}/profilepic`, formData, {})
        .then((results) => {
            const updatedUser = {
                first_name: results.data.user.user.first_name,
                last_name: results.data.user.user.last_name,
                email: results.data.user.user.email,
                phone_number: results.data.user.user.phone_number,
                id: results.data.user.user._id,
                token: results.data.token.token,
                profile_pic: results.data.user.user.profile_pic,
            };
            setUser(updatedUser);
            setRelUser(results.data.user.user);
            toggleEditImage();
        });
    };

    const toggleEditProfile = () => {
        setProfileEditing(!profileEditing);
    };

    const toggleEditImage = () => {
        setImageEditing(!imageEditing);
    };

    const handleScroll = (e) => {
        const bottom =
          e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
          setSkip(posts.length);
        }
    };

    if (!relUser) {
        return(
            <div>
                Loading...
            </div>
        );
    };

    return (
        <Container maxWidth='x1' sx={{minHeight: '100vh', marginTop: '10px'}}>
            <Grid container spacing={3} sx={{justifyContent: 'center'}}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{textAlign: 'center', margin: '0 5px 20px 5px'}}>
                        {profileEditing ? (
                            <EditProfileForm
                                user={relUser}
                                toggleEditProfile={toggleEditProfile}
                                handleProfileUpdate={handleProfileUpdate}
                            />
                        ) : imageEditing ? (
                            <EditProfilePicForm
                                user={relUser}
                                toggleEditImage={toggleEditImage}
                                handleProfilePicUpdate={handleProfilePicUpdate}
                            />
                        ) : (
                            <UserInfo
                                user={relUser}
                                loggedUser={user}
                                handleFriendReq={handleFriendReq}
                                toggleEditProfile={toggleEditProfile}
                                toggleEditImage={toggleEditImage}
                            />
                        )}
                    </Paper>
                </Grid>
                <Grid container spacing={3} sx={{justifyContent: 'center'}}>
                    <Grid item xs={12} md={6}>
                        {relUser._id === user.id ? (
                            <Paper sx={{textAlign: 'center', margin: '0 5px 20px 5px'}}>
                                <NewPostForm
                                    user={relUser}
                                    handlePostSend={handlePostSend}
                                />
                            </Paper>
                        ) : null}
                        <PostContainer
                            user={relUser}
                            posts={posts.filter((post) => post.post_author._id === relUser._id)}
                            handleCommentSend={handleCommentSend}
                            handleLikePost={handleLikePost}
                            handleLikeComment={handleLikeComment}
                            handleScroll={handleScroll}
                            loadingPosts={loadingPosts}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;