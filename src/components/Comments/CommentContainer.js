import React from "react";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";

const CommentContainer = ({
    post,
    showCommentForm,
    user,
    handleCommentSend,
    handleCommentEdit,
    handleCommentDelete,
    handleLikeComment,
    getPosts,
}) => {
    return (
        <div>
            {post.post_comments.map((comment) => {
                return (
                    <div key={comment._id}>
                        <Comment 
                            user={user}
                            comment={comment}
                            handleLikeComment={handleLikeComment}
                            handleCommentEdit={handleCommentEdit}
                            handleCommentDelete={handleCommentDelete}
                            postId={post._id}
                            getPosts={getPosts}
                        />
                    </div>
                )
            })}
            {showCommentForm ? (
                <NewCommentForm 
                    user={user}
                    handleCommentSend={handleCommentSend}
                    postId={post._id}
                    getPosts={getPosts}
                />
            ) : null}
        </div>
    )
};

export default CommentContainer