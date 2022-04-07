import React from "react";
import { useHistory } from "react-router-dom";
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
    const history = useHistory();

    const handleAvatarClick = (id) => {
        history.push(`/users/${id}`);
    };

    const handleFriendsClick = () => {
        history.push('/friends');
    }

    const handleSettingsClick = () => {
        // to implement this in backend, url to be determined
        history.push('/account');
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