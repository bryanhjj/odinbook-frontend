import React from "react";
import { useNavigate } from "react-router-dom";
import UseAvatar from '../../UseAvatar';

// mui setup
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const FriendCard = ({friend}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/users/${friend._id}`);
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