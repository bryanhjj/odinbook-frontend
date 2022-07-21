import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import ConfirmDialog from "./ConfirmDialog";;


const Account = ({user, setUser}) => {
    const [initials, setInitials] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setInitials(`${user.first_name[0]} ${user.last_name[0]}`);
        }
    }, [user]);

    const toggleDialog = () => {
        setDialogOpen(!dialogOpen);
    };

    const handleDelete = () => {
        setDialogOpen(false);
        setUser('');
        navigate('/login');
        axios.delete(`/users/${user.id}`);
    };

    return (
        <Container maxWidth="x1" sx={{minHeight: '100vh', marginTop: '10px'}}>
            <Grid container spacing={2} sx={{justifyContent: 'center'}}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{textAlign: 'center', margin: '0 5px 20px 5px'}}>
                        <Typography variant="h5">
                            My Account
                        </Typography>
                        <Box sx={{borderRadius: '50%', 
                                height: '150px', 
                                width: '150px', 
                                border: '1px solid black', 
                                marginBottom: 20,
                                marginTop: 5, 
                                marginLeft: 'auto',
                                marginRight: 'auto',}}>
                            <Avatar
                                alt={`${user.first_name} ${user.last_name}`}
                                src={user.profile_pic ? user.profile_pic : ''}
                                sx={{height: '150px', width: '150px'}}
                            >
                                {user.profile_pic ? null : initials}
                            </Avatar>
                        </Box>
                        <Button variant="contained" onClick={toggleDialog} sx={{marginBottom: '10px'}}>
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