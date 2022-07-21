import React from "react";

// mui setup
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const ConfirmDialog = ({dialogOpen, toggleDialog, handleDelete}) => {
    return (
        <Dialog
            sx={{backgroundColor: 'rgb(23, 24, 25)'}}
            open={dialogOpen}
            onClose={toggleDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Delete account
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete your OdinBook account?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} variant="contained" color="error">
                    Delete
                </Button>
                <Button onClick={toggleDialog} variant="contained">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;