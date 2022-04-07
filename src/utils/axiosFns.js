import axios from "./axios";

const sortPosts = (arr) => {
    const sorted = arr.sort(function(a, b){
        new Date(b.post_timestamp) - new Date(a.post_timestamp);
    });
    return sorted;
};

const axiosFns = (
    posts,
    setPosts,
    user,
    skip,
    setLoadingPosts,
    userFriends,
    setUserFriends,
    friendRequests,
    setFriendRequests,
    ) => {

        const getPosts = () => {
            if (skip === 0) {
                setLoadingPosts(true);
                axios
                .get(`/posts/?skip=${skip}`, { data: { skip: skip } })
                .then((results) => {
                    setPosts(sortPosts([...posts, results.data.posts]));
                    if (skip === 0) {
                        setLoadingPosts(false);
                    }
                });
            }
        };

        const handlePostSend = async (postContent, imageFile) => {
            if (imageFile) {
                const formData = new FormData();
                formData.append('post_img', imageFile);
                const res = await axios.post('/post', {post_content: postContent});
                // might need to change the axios.put
                const res2 = await axios.put(`/posts/${res.data.post_id}`, formData);
                const updatedPosts = [...posts, res2.data.post];
                setPosts(sortPosts(updatedPosts));
            } else {
                axios
                .post('/posts', {post_content: postContent})
                .then((results) => {
                    const updatedPosts = [...posts, results.data.post];
                    setPosts(sortPosts(updatedPosts));
                });
            };
        };

        const handleLikePost = (postId) => {
            axios
            .put(`/posts/${postId}/like`)
            .then((results) => {
                const updatedPosts = [...posts];
                const targetPost = updatedPosts.findIndex((post) => post._id == postId);
                // if the user has not previously liked the post
                if (!updatedPosts[targetPost].post_likes.includes(user.id)) {
                    updatedPosts[targetPost].post_likes.push(user.id);
                } else {
                    // the user has previously liked the post but changed their minds and wants to un-like it
                    updatedPosts[targetPost].post_likes = updatedPosts[targetPost].post_likes.filter((id) => {
                        id != user.id;
                    });
                }
                setPosts(sortPosts(updatedPosts));
            });
        }

        const handleCommentSend = (postId, commentContent) => {
            axios
            .post(`/posts/${postId}/comments`, {comment_content:commentContent})
            .then((results) => {
                const updatedPosts = [...posts];
                const targetPost = updatedPosts.findIndex((post) => post._id == postId);
                updatedPosts[targetPost].post_comments = [...updatedPosts[targetPost].post_comments, results.data.comment_content];
                setPosts(sortPosts(updatedPosts));
            });
        }

        const handleLikeComment = (postId, commentId) => {
            axios
            .put(`/posts/${postId}/comments/${commentId}/like`)
            .then((results) => {
                const updatedPosts = [...posts];
                const targetPost = updatedPosts.findIndex((post) => post._id == postId);
                const targetComment = updatedPosts[targetPost].post_comments.findIndex((c) => c._id == commentId);
                // if the user has not previously liked the comment
                if (!updatedPosts[targetPost].post_comments[targetComment].comment_likes.includes(user.id)) {
                    updatedPosts[targetPost].post_comments[targetComment].comment_likes.push(user.id);
                } else {
                    // user has previously liked the comment and is now un-liking it
                    updatedPosts[targetPost].post_comments[targetComment].comment_likes =
                    updatedPosts[targetPost].post_comments[targetComment].comment_likes.filter((id) => {
                        id != user.id;
                    });
                };
            });
        }

        const handleAcceptRequest = (id) => {
            axios
            .put(`/users/accept`, {target_userId: id})
            .then((results) => {
                setUserFriends(results.data.user.friend_list);
                // removing the request from friendRequests
                const updatedFriendReqs = friendRequests.filter((friendReq) => {
                    friendReq._id != id;
                });
                setFriendRequests(updatedFriendReqs);
            });
        };

        const handleDenyRequest = (id) => {
            axios
            .delete(`/users/decline`, { data: {target_userId: id} })
            .then((results) => {
                const updatedFriendReqs = friendRequests.filter((friendReq) => {
                    friendReq._id != id;
                });
                setFriendRequests(updatedFriendReqs);
            });
        };

        return {
            getPosts,
            handlePostSend,
            handleLikePost,
            handleCommentSend,
            handleLikeComment,
            handleAcceptRequest,
            handleDenyRequest
        };
};

export default axiosFns;