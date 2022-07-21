import React from "react";
import FacebookLogin from "react-facebook-login";

// mui setup
import FacebookIcon from '@mui/icons-material/Facebook';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Facebook = ({handleFBLogin}) => {
    const componentClicked = () => {};

    const responseFB = (res) => {
        handleFBLogin(res.accessToken);
    };

    return (
        <Box style={{ display: 'flex', margin: "8px 8px 8px 8px", alignSelf: 'center' }}>
            <FacebookLogin
                appId={process.env.FACEBOOK_APP_ID}
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFB}
                render={(renderProps) => (
                    <Button
                        onClick={renderProps.onClick}
                        variant="contained"
                        color="secondary"
                        style={{ width: "100%" }}
                        startIcon={<FacebookIcon />}
                    >
                        Log in with Facebook
                    </Button>
                )}
            />
        </Box>
    )
};

export default Facebook;