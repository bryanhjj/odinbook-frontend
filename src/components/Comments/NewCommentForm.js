import React, { useState } from "react";
import UseAvatar from "../../UseAvatar";

// mui setup
import TextField from '@mui/material/TextField';

const NewCommentForm = ({postId, user, handleCommentSend}) => {
    const [commentContent, setCommentContent] = useState('');

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleCommentSend(postId, commentContent);
            setCommentContent('');
        };
    };

    // might change this to show 'invalid user'
    if (!user) {
        return (
            <div>
                Loading...
            </div>
        );
    };

    return (
        <div>
            <UseAvatar user={user} />
            <TextField 
                variant='standard'
                placeholder="Enter you comment here"
                onKeyPress={handleKeyPress}
                onChange={(e) => setCommentContent(e.target.value)}
                value={commentContent}
            />
        </div>
    );
};

export default NewCommentForm;