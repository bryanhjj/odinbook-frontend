import React, { useState } from "react";
import UseAvatar from "../../UseAvatar";

// mui setup
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

var async = require('async');

const NewCommentForm = ({postId, user, handleCommentSend, getPosts}) => {
    const [commentContent, setCommentContent] = useState('');

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            await handleCommentSend(postId, commentContent);
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
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'flex-start',
            }}>
            <UseAvatar user={user}/>
            <TextField 
                sx={{marginLeft: '8px'}}
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

export default NewCommentForm;