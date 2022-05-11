import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentContainer from "../Comments/CommentContainer";
import UseAvatar from "../../UseAvatar";

// mui setup
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

// the handle functions are all defined in axiosFns
const Post = ({user, post, handleCommentSend, handleLikePost, handleLikeComment}) => {
    const [showCommentForm, setShowCommentForm] = useState(false);
    const navigate = useNavigate();

    const toggleShowComment = () => {
        setShowCommentForm(!showCommentForm);
    }

    const handleNameClick = () => {
        navigate(`/users/${post.post_author._id}`);
    }

    return (
        <div>
            <div>
                <UseAvatar user={post.post_author} />
                <div>
                    <Typography variant="body1" onClick={handleNameClick}>
                        {`${post.post_author.first_name} ${post.post_author.last_name}`}
                    </Typography>
                    <Typography variant="body2">
                        {post.timestamp}
                    </Typography>
                </div>
            </div>

            <div>
                <Typography variant="body1">
                    {post.post_content}
                </Typography>
            </div>

            <div>
                {post.post_img && <img src={post.post_img} width="100%"/>}
            </div>

            <Typography>
                {post.post_likes.length === 1 ? "1 like" : `${post.post_likes.length} likes`}
            </Typography>

            <Divider />

            <div>
                <Button 
                    variant="outlined" 
                    startIcon={<ThumbUpIcon />} 
                    onClick={() => handleLikePost(post._id)}
                >
                    Like
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<CommentIcon />}
                    onClick={toggleShowComment}
                >
                    Comment
                </Button>
            </div>

            <Divider />

            <CommentContainer 
                post={post}
                showCommentForm={showCommentForm}
                user={user}
                handleCommentSend={handleCommentSend}
                handleLikeComment={handleLikeComment}
            />
        </div>
    );
}

export default Post;