import React from "react";
import Post from './Post';

// mui setup
import Paper from '@mui/material/Paper';

const PostContainer = ({
    user,
    posts,
    handlePostEdit,
    handlePostDelete,
    handleCommentSend,
    handleCommentEdit,
    handleCommentDelete,
    handleLikePost,
    handleLikeComment,
    handleScroll,
    loading,
    getPosts,
}) => {

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    };

    if (!posts.length) {
        return (
            <Paper>
                <div>
                    No posts here
                </div>
            </Paper>
        );
    };
    return (
        <div onScroll={handleScroll}>
            {posts.map((post) => {
                return (
                    <Paper key={post._id}>
                        <Post 
                            post={post}
                            user={user}
                            handlePostEdit={handlePostEdit}
                            handlePostDelete={handlePostDelete}
                            handleCommentSend={handleCommentSend}
                            handleCommentEdit={handleCommentEdit}
                            handleCommentDelete={handleCommentDelete}
                            handleLikePost={handleLikePost}
                            handleLikeComment={handleLikeComment}
                            getPosts={getPosts}
                        />
                    </Paper>
                );
            })}
        </div>
    );
};

export default PostContainer;