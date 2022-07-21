import React from "react";
// import { useNavigate } from "react-router-dom";
import UseAvatar from '../../UseAvatar';

// mui setup
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const FriendCard = ({friend}) => {
    // const navigate = useNavigate();

    /*
    const handleClick = () => {
        navigate(`/users/${friend._id}`);
    }
    */

    return (
        <Paper sx={{
            backgroundColor: 'rgb(32,33,34)', 
            color: 'white', 
            margin: '20px 10px',
            width: '25%',
            textAlign: 'center',
            }}>
            <Card sx={{display: 'flex', alignItems: 'center',  paddingLeft: '8px'}}>
                <UseAvatar user={friend} />
                <CardContent>
                    <Typography variant="body1">
                        {friend.first_name} {friend.last_name}
                    </Typography>
                </CardContent>
            </Card>
        </Paper>
    )
}

export default FriendCard;