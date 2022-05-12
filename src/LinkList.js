import React from "react";
import { useNavigate } from "react-router-dom";
import UseAvatar from "./UseAvatar";

// mui setup
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { ListItem, ListItemIcon } from "@mui/material";
import Divider from '@mui/material/Divider';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

const LinkList = ({user}) => {
    const navigate = useNavigate();

    const handleAvatarClick = (id) => {
        navigate(`/users/${id}`);
    };

    const handleFriendsClick = () => {
        navigate('/friends');
    }

    const handleSettingsClick = () => {
        navigate('/account');
    }

    return (
        <div>
            <List aria-label='nav list'>
                <ListItem>
                    <ListItemAvatar onClick={()=>handleAvatarClick(user.id)}>
                        <UseAvatar user={user}/>
                    </ListItemAvatar>
                    <ListItemText primary={`${user.first_name} ${user.last_name}`}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Friends' onClick={handleFriendsClick}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon>
                        <SettingsIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Settings' onClick={handleSettingsClick}/>
                </ListItem>
            </List>
        </div>
    );
};

export default LinkList;