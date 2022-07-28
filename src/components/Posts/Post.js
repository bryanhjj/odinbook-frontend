import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistance } from "date-fns";
import CommentContainer from "../Comments/CommentContainer";
import UseAvatar from "../../UseAvatar";
import EditPostForm from "./EditPostForm";

// mui setup
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// the handle functions are all defined in axiosFns
const Post = ({
    user, 
    post, 
    handlePostEdit,
    handlePostDelete, 
    handleCommentSend, 
    handleCommentEdit, 
    handleCommentDelete,
    handleLikePost, 
    handleLikeComment, 
    getPosts
}) => {
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const navigate = useNavigate();

    const toggleShowComment = () => {
        setShowCommentForm(!showCommentForm);
    }

    const toggleShowEdit = () => {
        setShowEditForm(!showEditForm);
    }

    const handleNameClick = () => {
        navigate(`/users/${post.post_author._id}`);
    }

    return (
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', margin: '8px', paddingTop: '8px'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                <UseAvatar user={post.post_author}/>    

                <Box sx={{flexDirection: 'column', marginLeft: '8px'}}>
                    <Typography variant="body1" onClick={handleNameClick}>
                        {`${post.post_author.first_name} ${post.post_author.last_name}`}
                    </Typography>
                    <Typography variant="body2">
                        {formatDistance(new Date(post.post_timestamp), new Date(), {
                            addSuffix: true,
                        })}
                    </Typography>
                </Box>

                {user.id === post.post_author._id && 
                    <div>
                        {showEditForm? (
                            <Box>
                                <EditPostForm 
                                    user={user}
                                    targetPost={post}
                                    handlePostEdit={handlePostEdit}
                                    getPosts={getPosts}
                                />
                            </Box>
                        ) : (
                            <Box sx={{marginLeft: '56vh', display: 'inline'}}>
                                <IconButton
                                    aria-label="Edit post"
                                    onClick={toggleShowEdit}
                                >
                                    <EditIcon fontSize="small"/>
                                </IconButton>

                                <IconButton
                                    aria-label="Delete post"
                                    onClick={() => handlePostDelete(post._id)}
                                >
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </Box>
                        )}
                    </div>
                }
            </Box>

            <div>
                <Typography variant="body1">
                    {post.post_title}
                </Typography>
            </div>

            <div>
                <Typography variant="body1">
                    {post.post_content}
                </Typography>
            </div>

            <div>
                {post.post_img && <img src={post.post_img} width="100%" alt="Post attachment"/>}
            </div>

            <Typography variant='subtitle2'>
                {post.post_likes.length === 1 ? "1 like" : `${post.post_likes.length} likes`}
            </Typography>

            <Box sx={{margin: '8px 0 8px 0'}}>
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
            </Box>

            <CommentContainer 
                post={post}
                showCommentForm={showCommentForm}
                user={user}
                handleCommentSend={handleCommentSend}
                handleCommentEdit={handleCommentEdit}
                handleCommentDelete={handleCommentDelete}
                handleLikeComment={handleLikeComment}
                getPosts={getPosts}
            />
        </Box>
    );
}

export default Post;