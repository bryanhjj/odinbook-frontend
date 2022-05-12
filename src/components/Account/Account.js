import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import UseAvatar from "../../UseAvatar";
import ConfirmDialog from "./ConfirmDialog";;


const Account = ({user, setUser}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const toggleDialog = () => {
        setDialogOpen(!dialogOpen);
    };

    const handleDelete = () => {
        setDialogOpen(false);
        setUser('');
        navigate('/login');
        axios.delete(`/users/${user.id}`);
    };

    if (loading) {
        return <div>Loading...</div>
    };

    return (
        <Container maxWidth="x1">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper>
                        <Typography variant="h5">
                            My Account
                        </Typography>
                        <div>
                            <UseAvatar user={user} />
                        </div>
                        <Button variant="contained" onClick={toggleDialog}>
                            Delete account
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <ConfirmDialog 
                dialogOpen={dialogOpen}
                toggleDialog={toggleDialog}
                handleDelete={handleDelete}
            />
        </Container>
    );
};

export default Account;