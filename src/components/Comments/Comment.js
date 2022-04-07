import React from "react";
import UseAvatar from "../../UseAvatar";

// mui setup
import IconButton from '@mui/material/IconButton';
import { Typography } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

// handleLikeComment & handleLikePost not defined?
const Comment = ({comment, handleLikeComment, postId}) => {
    return (
        <div>
            <UseAvatar user={comment.comment_author}/>
            <Typography variant="body2">
                {comment.comment_author.first_name} {comment.comment_author.last_name}
            </Typography>
            <Typography variant="body2">
                {comment.comment_content}
            </Typography>
            <div>
                <IconButton
                    aria-label="like comment"
                    size="small"
                    onClick={() => handleLikeComment(postId, comment._id)}    
                >
                    <ThumbUpIcon fontSize="inherit"/>
                </IconButton>
                <Typography variant="body2">
                    {`${comment.comment_likes.length}`}
                </Typography>
            </div>
        </div>
    );
};

export default Comment;