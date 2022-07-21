import React from "react";
import { useNavigate } from "react-router-dom";
import UseAvatar from '../../UseAvatar';

// mui setup
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const FriendCard = ({friend, handleAcceptRequest, handleDenyRequest}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/users/${friend._id}`);
    }

    return (
        <Paper sx={{
            textAlign: 'center',
            backgroundColor: 'rgb(32,33,34)',
            color: 'white',
            margin: '20px 10px',
            width: '25%',
        }}>
            <Card sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', paddingLeft: '8px'}}>
                <UseAvatar user={friend} />
                <CardContent onClick={handleClick} sx={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Typography variant="body1" sx={{flexWrap: 'wrap'}}>
                        {friend.first_name} {friend.last_name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small' onClick={() => handleAcceptRequest(friend._id)}>
                        Accept
                    </Button>
                    <Button size='small' onClick={() => handleDenyRequest(friend._id)}>
                        Deny
                    </Button>
                </CardActions>
            </Card>
        </Paper>
    );
}

export default FriendCard;