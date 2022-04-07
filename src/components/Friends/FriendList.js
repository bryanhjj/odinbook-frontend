import React from "react";
import { useHistory } from "react-router-dom";
import UseAvatar from "../../UseAvatar";

// mui setup
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { IconButton, ListItem } from "@mui/material";
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

const FriendList = ({friends, friendReqs, handleAcceptRequest, handleDenyRequest}) => {
    const history = useHistory();

    const handleAvatarClick = (id) => {
        history.push(`/users/${id}`);
    };

    return (
        <div>
            <List
                aria-label="Friend Requests Received"
                subheader={<ListSubheader>Friend requests received</ListSubheader>}
            >
                {friendReqs.map((sender) => {
                    return (
                        <ListItem>
                            <ListItemAvatar onClick={()=>handleAvatarClick(sender._id)}>
                                <UseAvatar user={sender}/>
                            </ListItemAvatar>
                            <ListItemText primary={`${sender.first_name} ${sender.last_name}`}/>
                            <ListItemSecondaryAction>
                                <IconButton onClick={()=>handleAcceptRequest(sender._id)}>
                                    <CheckIcon/>
                                </IconButton>
                                <IconButton onClick={()=>handleDenyRequest(sender._id)}>
                                    <NotInterestedIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>

            <List
                aria-label="Friends"
                subheader={<ListSubheader>Friends</ListSubheader>}
            >
                {friends.map((fren)=>{
                    return (
                        <ListItem>
                            <ListItemAvatar onClick={()=>handleAvatarClick(fren._id)}>
                                <UseAvatar user={fren}/>
                            </ListItemAvatar>
                            <ListItemText primary={`${fren.first_name} ${fren.last_name}`}/>
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );
};

export default FriendList;