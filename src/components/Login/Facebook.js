import React from "react";
import FacebookLogin from "react-facebook-login";

// mui setup
import FacebookIcon from '@mui/icons-material/Facebook';
import Button from '@mui/material/Button';

const Facebook = ({handleFBLogin}) => {
    const componentClicked = () => {};

    const responseFB = (res) => {
        handleFBLogin(res.accessToken);
    };

    return (
        <div style={{ width: "100%", margin: "0 8px 8px 8px" }}>
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
        </div>
    )
};

export default Facebook;