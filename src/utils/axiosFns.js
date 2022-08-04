import axios from "./axios";
const FormData = require('form-data');

const sortPosts = (arr) => {
    const sorted = arr.sort((a, b) =>
        new Date(b.post_timestamp) - new Date(a.post_timestamp)
    );
    return sorted;
};

const axiosFns = ({
    posts,
    setPosts,
    user,
    skip,
    setLoadingPosts,
    userFriends,
    setUserFriends,
    friendRequests,
    setFriendRequests,
}) => {

        const getPosts = () => {
            if (skip === 0) {
                // when skip === 0, sets the GET results as the posts array 
                setLoadingPosts(true);
                axios
                .get(`/posts/?skip=${skip}`, { data: { skip: skip } })
                .then((results) => {
                    setPosts(sortPosts([...results.data.posts]));
                    if (skip === 0) {
                        setLoadingPosts(false);
                    };
                });
            } else {
                // when skip !== 0, appends the GET results (after skip) to the old posts array
                axios
                .get(`/posts/?skip=${skip}`, { data: { skip: skip } })
                .then((results) => {
                setPosts(sortPosts([...posts, ...results.data.posts]));
                if (skip === 0) {
                    setLoadingPosts(false);
                };
            });
            }
        };

        const handlePostSend = async (postTitle, postContent, imageFile) => {
            if (imageFile) {
                const formData = new FormData();
                formData.append('post_title', postTitle);
                formData.append('post_content', postContent);
                formData.append('post_img', imageFile);
                const res = await axios.post('/posts/', formData);
                const updatedPosts = [...posts, res.data.post];
                setPosts(sortPosts(updatedPosts));
            } else {
                axios
                .post('/posts/', {post_title: postTitle, post_content: postContent})
                .then((results) => {
                    const updatedPosts = [...posts, results.data.post];
                    setPosts(sortPosts(updatedPosts));
                });
            };
        };

        const handlePostEdit = async (postId, postTitle, postContent, imageFile) => {
            const targetPost = await axios.get(`/posts/${postId}`);
            // constructing the req.body so that it includes the older posts' post_like, post_comments & post_img
            const updatedPost = {
                post_title: postTitle,
                post_content: postContent,
                post_likes: targetPost.post_likes,
                post_comments: targetPost.post_comments,
                post_img: targetPost.post_img,
            };
            if (imageFile) {
                const formData = new FormData();
                formData.append('post_img', imageFile);
                const res = await axios.post(`/posts/${postId}`, formData, updatedPost);
                const updatedPosts = [...posts, res.data.post];
                setPosts(sortPosts(updatedPosts));
            } else {
                axios.post(`/posts/${postId}`, updatedPost)
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
                const targetPost = updatedPosts.findIndex((post) => post._id === postId);
                // if the user has not previously liked the post
                if (!updatedPosts[targetPost].post_likes.includes(user.id)) {
                    updatedPosts[targetPost].post_likes.push(user.id);
                } else {
                    // the user has previously liked the post but changed their minds and wants to un-like it
                    updatedPosts[targetPost].post_likes = updatedPosts[targetPost].post_likes.filter((id) => 
                        id !== user.id
                    );
                }
                setPosts(sortPosts(updatedPosts));
            });
        };

        const handlePostDelete = (postId) => {
            axios
            .delete(`/posts/${postId}`)
            .then((results) => {
                const oldPosts = [...posts];
                const filteredPosts = oldPosts.filter((p) => p._id !== postId);
                setPosts(sortPosts(filteredPosts));
            });
        };

        const handleCommentSend = (postId, commentContent) => {
            axios
            .post(`/posts/${postId}/comments`, {comment_content:commentContent})
            .then((results) => {
                /*
                const updatedPosts = [...posts];
                const targetPost = updatedPosts.findIndex((post) => post._id === postId);
                updatedPosts[targetPost].post_comments = [...updatedPosts[targetPost].post_comments, results.data.comment];
                setPosts(sortPosts(updatedPosts));
                */
                getPosts();
            });
        };

        const handleCommentEdit = async (postId, commentId, commentContent) => {
            const targetComment = await axios.get(`/posts/${postId}/comments/${commentId}`);
            // constructing the req.body so that it includes the older comments' related_post & comment_likes
            const updatedComment = {
                comment_content: commentContent,
                related_post: targetComment.related_post,
                comment_likes: targetComment.comment_likes,
            };
            axios.post(`/posts/${postId}/comments/${commentId}`, updatedComment)
            .then((results) => {
                /*
                const updatedPosts = [...posts];
                const targetPost = updatedPosts.findIndex((post) => post._id === postId);
                updatedPosts[targetPost].post_comments = [...updatedPosts[targetPost].post_comments, results.data.comment];
                setPosts(sortPosts(updatedPosts));
                */
                getPosts();
            });
        };

        const handleCommentDelete = (postId, commentId) => {
            axios
            .delete(`/posts/${postId}/comments/${commentId}`)
            .then((results) => {
                /*
                const updatedPosts = [...posts];
                const targetPost = updatedPosts.findIndex((post) => post._id === postId);
                updatedPosts[targetPost].post_comments.filter((c) => c._id !== commentId);
                setPosts(sortPosts(updatedPosts));
                */
                getPosts();
            });
        };

        const handleLikeComment = (postId, commentId) => {
            axios
            .put(`/posts/${postId}/comments/${commentId}/like`)
            .then((results) => {
                const updatedPosts = [...posts];
                const targetPost = updatedPosts.findIndex((post) => post._id === postId);
                const targetComment = updatedPosts[targetPost].post_comments.findIndex((c) => c._id === commentId);
                // if the user has not previously liked the comment
                if (!updatedPosts[targetPost].post_comments[targetComment].comment_likes.includes(user.id)) {
                    updatedPosts[targetPost].post_comments[targetComment].comment_likes.push(user.id);
                } else {
                    // user has previously liked the comment and is now un-liking it
                    updatedPosts[targetPost].post_comments[targetComment].comment_likes =
                    updatedPosts[targetPost].post_comments[targetComment].comment_likes.filter((id) => 
                        id !== user.id
                    );
                };
                setPosts(sortPosts(updatedPosts));
            });
        };

        const handleAcceptRequest = (id) => {
            axios
            .put(`/users/accept`, {target_userId: id})
            .then((results) => {
                setUserFriends(results.data.user.friend_list);
                // removing the request from friendRequests
                const updatedFriendReqs = friendRequests.filter((friendReq) => 
                    friendReq._id !== id
                );
                setFriendRequests(updatedFriendReqs);
            });
        };

        const handleDenyRequest = (id) => {
            axios
            .delete(`/users/deny`, {data: {target_userId: id}})
            .then((results) => {
                const updatedFriendReqs = friendRequests.filter((friendReq) => 
                    friendReq._id !== id
                );
                setFriendRequests(updatedFriendReqs);
            });
        };

        return {
            getPosts,
            handlePostSend,
            handlePostEdit,
            handleLikePost,
            handlePostDelete,
            handleCommentSend,
            handleCommentEdit,
            handleCommentDelete,
            handleLikeComment,
            handleAcceptRequest,
            handleDenyRequest
        };
};

export default axiosFns;