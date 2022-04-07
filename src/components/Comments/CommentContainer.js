import React from "react";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";

const CommentContainer = ({
    post,
    showCommentForm,
    user,
    handleCommentSend,
    handleLikeComment
}) => {
    return (
        <div>
            {post.post_comments.map((comment) => {
                return (
                    <Comment 
                        comment={comment}
                        handleLikeComment={handleLikeComment}
                        postId={post._id}
                        key={comment._id}
                    />
                )
            })}
            {showCommentForm ? (
                <NewCommentForm 
                    user={user}
                    handleCommentSend={handleCommentSend}
                    postId={post._id}
                />
            ) : null}
        </div>
    )
};

export default CommentContainer