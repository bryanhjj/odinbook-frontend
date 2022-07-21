import React, { useState } from "react";
import UseAvatar from "../../UseAvatar";
import CommentEditForm from "./CommentEditForm";
import { formatDistance } from "date-fns";

// mui setup
import IconButton from '@mui/material/IconButton';
import { Typography } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Comment = ({user, comment, handleLikeComment, handleCommentEdit, handleCommentDelete, postId, getPosts}) => {
    const [showEditForm, setShowEditForm] = useState(false);

    const toggleShowEdit = () => {
        setShowEditForm(!showEditForm);
    }

    return (
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', margin: '8px', paddingTop: '8px'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                <UseAvatar user={comment.comment_author}/>

                <Box sx={{flexDirection: 'column', marginLeft: '8px'}}>
                    <Typography variant="body2">
                        {comment.comment_author.first_name} {comment.comment_author.last_name}
                    </Typography>  
                    <Typography variant="caption">
                        {formatDistance(new Date(comment.comment_timestamp), new Date(), {
                            addSuffix: true,
                        })}
                    </Typography>
                </Box>

            {user.id === comment.comment_author._id && 
                <div>
                    {showEditForm ? (
                        <Box>
                            <CommentEditForm 
                                user={user}
                                postId={comment.related_post}
                                targetComment={comment}
                                handleCommentEdit={handleCommentEdit}
                                getPosts={getPosts}
                            />
                        </Box>
                    ) : (
                        <Box sx={{marginLeft: '57vh', display: 'inline'}}>
                            <IconButton
                                aria-label="Edit comment"
                                onClick={toggleShowEdit}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                aria-label="Delete comment"
                                onClick={() => handleCommentDelete(postId, comment._id)}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                         </Box>
                    )}
                </div>
            }
            </Box>
            
            <Typography variant="body2">
                {comment.comment_content}
            </Typography>

            <Box>
                <Typography variant="body2">
                    {comment.comment_likes.length === 1 ? '1 like' : `${comment.comment_likes.length} likes`}
                </Typography>
                <IconButton
                    aria-label="like comment"
                    size="small"
                    onClick={() => handleLikeComment(postId, comment._id)}    
                >
                    <ThumbUpIcon fontSize="inherit"/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default Comment;