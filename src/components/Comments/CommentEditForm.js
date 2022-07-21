import React, { useState } from "react";

// mui setup
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

var async = require('async');

const CommentEditForm = ({user, postId, targetComment, handleCommentEdit, getPosts}) => {
    const [commentContent, setCommentContent] = useState(targetComment.comment_content);

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            await handleCommentEdit(postId, targetComment._id, commentContent);
            setCommentContent('');
            // getPosts('');
        };
    };

    if (!user) {
        return (
            <div>
                Loading...
            </div>
        );
    };

    return (
        <Box sx={{
            margin: '8px', 
            width: '90%', 
            maxWidth: '100%', 
        }}>
            <TextField 
                fullWidth
                variant='outlined'
                placeholder="Enter you comment here"
                onKeyPress={handleKeyPress}
                onChange={(e) => setCommentContent(e.target.value)}
                value={commentContent}
            />
        </Box>
    );
};

export default CommentEditForm;