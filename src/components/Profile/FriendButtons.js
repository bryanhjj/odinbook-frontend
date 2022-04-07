import React from "react";

// mui setup
import Button from '@mui/material/Button';

const FriendButtons = ({
    user,
    friendsArr,
    friendReqSent, // logged user's friend requests sent
    loggedUser,
    handleFriendReq,
    friendReqRec, // logged user's friend requests received
    acceptFriendReq,
    denyFriendReq,
}) => {
    return (
        <div>
            {friendsArr.includes(loggedUser.id) ? (//user already friends with the target user?
                <div>
                    <Button variant="outlined">
                        Already befriended
                    </Button>
                </div>
            ) : friendReqSent.includes(user._id) ? (//user have sent a friend request to the target user?
                <div>
                    <Button variant="outlined">
                        Friend request sent
                    </Button>
                </div>
            ) : friendReqRec.includes(user._id) ? (//target user have sent user(you) a friend request
                <div>
                    <Button variant="contained" onClick={() => acceptFriendReq(user._id)}>
                        Accept friend request
                    </Button>
                    <Button variant="contained" onClick={() => denyFriendReq(user._id)}>
                        Decline friend request
                    </Button>
                </div>
            ) : (//total stranger, not friends
                <div>
                    <Button variant="contained" onClick={() => handleFriendReq(user._id)}>
                        Send friend request
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FriendButtons;