import React from "react";
import { useHistory } from "react-router-dom";
import UseAvatar from '../../UseAvatar';

// mui setup
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const FriendCard = ({friend}) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/users/${friend._id}`);
    }

    return (
        <div>
            <Card>
                <UseAvatar user={friend} />
                <CardContent>
                    <Typography variant="body1">
                        {friend.first_name} {friend.last_name}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default FriendCard;