import React from "react";
import { useHistory } from "react-router-dom";
import UseAvatar from '../../UseAvatar';

// mui setup
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const FriendCard = ({friend, handleAcceptRequest, handleDenyRequest}) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/users/${friend._id}`);
    }

    return (
        <div>
            <Card>
                <UseAvatar user={friend} />
                <CardContent onClick={handleClick}>
                    <Typography variant="body1">
                        {friend.first_name} {friend.last_name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small' onClick={handleAcceptRequest(friend._id)}>
                        Accept
                    </Button>
                    <Button size='small' onClick={handleDenyRequest(friend._id)}>
                        Deny
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default FriendCard;