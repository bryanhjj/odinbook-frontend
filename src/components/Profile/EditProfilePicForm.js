import React, { useState } from "react";

// mui setup
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const EditProfilePicForm = ({user, toggleEditImage, handleProfilePicUpdate}) => {
    const [profilePic, setProfilePic] = useState(null);

    const handleChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            <Typography variant="h5" sx={{margin: '10px 8px'}}>
                Update profile picture
            </Typography>
            <TextField
                sx={{margin: 8}}
                id="new_profile_pic"
                name="new_profile_pic"
                type="file"
                onChange={(e) => handleChange(e)}
            />
            <Button variant="contained" sx={{margin: '10px 10px'}} onClick={handleProfilePicUpdate(profilePic)}>Confirm changes</Button>
            <Button variant="contained" sx={{margin: '10px 10px'}} onClick={toggleEditImage}>Cancel</Button>
        </Box>
    );
};

export default EditProfilePicForm;