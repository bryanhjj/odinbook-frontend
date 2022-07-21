import React from "react";
import { useNavigate } from "react-router-dom";
import UseAvatar from "../../UseAvatar";

// mui setup
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { IconButton, ListItem } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


const FriendList = ({friends, friendReqs, handleAcceptRequest, handleDenyRequest}) => {
    const navigate = useNavigate();

    const handleAvatarClick = (id) => {
        navigate(`/users/${id}`);
    };

    return (
        <div>
            <List
                aria-label="Friend Requests Received"
                subheader={<ListSubheader>Friend requests received</ListSubheader>}
            >
                {friendReqs.length > 0 ? (
                    friendReqs.map((sender) => {
                        return (
                            <ListItem key={sender._id} secondaryAction={
                                <div>
                                    <IconButton sx={{color: 'success.main'}} onClick={() => handleAcceptRequest(sender._id)}>
                                        <CheckIcon/>
                                    </IconButton>
                                    <IconButton sx={{color: 'error.main'}} onClick={() => handleDenyRequest(sender._id)}>
                                        <NotInterestedIcon/>
                                    </IconButton>
                                </div>
                                }
                            >
                                <ListItemAvatar onClick={() => handleAvatarClick(sender._id)}>
                                    <UseAvatar user={sender}/>
                                </ListItemAvatar>
                                <ListItemText primary={`${sender.first_name} ${sender.last_name}`}/>
                            </ListItem>
                        );
                    })
                ) : (
                    <Typography variant="body1">
                        No friend requests at this moment.
                    </Typography>
                )}
            </List>
            <Divider/>
            <List
                aria-label="Friends"
                subheader={<ListSubheader>Friends</ListSubheader>}
            >
                {friends.length > 0 ? (
                    friends.map((fren)=>{
                        return (
                            <ListItem key={fren._id}>
                                <ListItemAvatar onClick={() => handleAvatarClick(fren._id)}>
                                    <UseAvatar user={fren}/>
                                </ListItemAvatar>
                                <ListItemText primary={`${fren.first_name} ${fren.last_name}`}/>
                            </ListItem>
                        )
                        })) : (
                    <Typography variant="body1">
                        No friends yet!
                    </Typography>
                )}
            </List>
        </div>
    );
};

export default FriendList;