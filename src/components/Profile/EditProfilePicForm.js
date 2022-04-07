import React, { useState } from "react";

// mui setup
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const EditProfilePicForm = ({user, toggleEditProfilePic, handleProfilePicUpdate}) => {
    const [profilePic, setProfilePic] = useState(null);

    const handleChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    return (
        <div>
            <Typography variant="h5">Update profile picture</Typography>
            <TextField
                id="new_profile_pic"
                name="new_profile_pic"
                type="file"
                onChange={(e) => handleChange(e)}
            />
            <Button variant="contained" onClick={handleProfilePicUpdate(profilePic)}>Confirm changes</Button>
            <Button variant="contained" onClick={toggleEditProfilePic}>Cancel</Button>
        </div>
    );
};

export default EditProfilePicForm;