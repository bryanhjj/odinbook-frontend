import React from "react";
import Post from './Post';

// mui setup
import Paper from '@mui/material/Paper';

const PostContainer = ({
    user,
    posts,
    handleCommentSend,
    handleLikePost,
    handleLikeComment,
    handleScroll,
    loading
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
                            handleCommentSend={handleCommentSend}
                            handleLikePost={handleLikePost}
                            handleLikeComment={handleLikeComment}
                        />
                    </Paper>
                );
            })}
        </div>
    );
};

export default PostContainer;