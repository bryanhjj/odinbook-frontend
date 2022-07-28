import React, { useState } from "react";
import UseAvatar from '../../UseAvatar';

// mui setup
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import Box from '@mui/system/Box';

var async = require("async");

const NewPostForm = ({user, handlePostSend, getPosts}) => {
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [showImgForm, setShowImgForm] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        };
    };

    const handleSubmit = async () => {
        await handlePostSend(postTitle, postContent, imageFile);
        setPostContent('');
        setPostTitle('');
        setShowImgForm(false);
        setImageFile(null);
        setImgPreview(null);
        getPosts();
    };

    const toggleImgForm = () => {
        setShowImgForm(!showImgForm);
    }

    const handleImgChange = (e) => {
        setImageFile(e.target.files[0]);
        setImgPreview(URL.createObjectURL(e.target.files[0]));
    }

    const handleCancel = () => {
        setImageFile(null);
        setImgPreview(null);
        toggleImgForm();
    }

    if (!user) {
        return (
            <div>
                Loading...
            </div>
        );
    };

    return (
        <Box sx={{marginBottom: '8px', minHeight: '25vh', '& .MuiTextField-root': { m: 1, width: '97%', maxWidth: '100%'}}}>
            <Box sx={{margin: '0px 8px 0px 8px', paddingTop: '8px'}}>
                <UseAvatar user={user}/>
                <TextField 
                    fullWidth
                    sx={{display: 'block', marginTop: '2px'}}
                    id="outlined-multiline-static"
                    placeholder="Post title here"
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setPostTitle(e.target.value)}
                    value={postTitle}
                />
                <TextField 
                    fullWidth
                    sx={{display: 'block', marginBottom: '2px'}}
                    id="outlined-multiline-static"
                    multiline
                    rows={2}
                    placeholder="Enter your post here"
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setPostContent(e.target.value)}
                    value={postContent}
                />    
                
                {showImgForm ? (
                    <Button
                        variant="contained"
                        type="reset"
                        onClick={handleCancel}
                    >
                        Cancel adding image
                    </Button>
                ) : (
                    <Button
                        sx={{margin: '8px', position: 'relative'}}
                        variant="contained"
                        startIcon={<InsertPhotoIcon />}
                        onClick={toggleImgForm}
                        size="small"
                    >
                        Add image
                    </Button>
                )}
            </Box>

            <Box>
                {showImgForm ? (
                    <div>
                        {imgPreview ? (
                            <div>
                                <img src={imgPreview} width="100%" alt="Preview" />
                            </div>
                        ) : (
                            <div>
                                <TextField
                                    variant='standard'
                                    type='file'
                                    onChange={(e) => handleImgChange(e)}
                                    name="post_img"
                                    id="post_img"
                                />
                            </div>
                        )}
                        <Button
                            sx={{margin: '8px', position: 'relative'}}
                            variant="contained"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                ) : null}
            </Box>
        </Box>
    );
};

export default NewPostForm;