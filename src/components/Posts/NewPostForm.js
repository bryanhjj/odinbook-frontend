import React, { useState } from "react";
import UseAvatar from '../../UseAvatar';

// mui setup
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const NewPostForm = ({user, handlePostSend}) => {
    const [postContent, setPostContent] = useState('');
    const [showImgForm, setShowImgForm] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        };
    };

    const handleSubmit = () => {
        handlePostSend(postContent, imageFile);
        setPostContent('');
        setShowImgForm(false);
        setImageFile(null);
        setImgPreview(null);
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
    }

    if (!user) {
        return (
            <div>
                Loading...
            </div>
        );
    };

    return (
        <div>
            <div>
                <UseAvatar user={user} />
                <TextField 
                    variant='standard'
                    placeholder="Enter your post here"
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setPostContent(e.target.value)}
                    value={postContent}
                />
                {showImgForm ? (
                    <div>
                        <Button
                            variant="contained"
                            type="reset"
                            onClick={handleCancel}
                        >
                            Cancel adding image
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button
                            variant="contained"
                            startIcon={<InsertPhotoIcon />}
                            onClick={toggleImgForm}
                        >
                            Add image
                        </Button>
                    </div>
                )}
            </div>

            <div>
                {showImgForm ? (
                    <div>
                        {imgPreview ? (
                            <div>
                                <img src={imgPreview} width="100%" />
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
                            variant="contained"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default NewPostForm;