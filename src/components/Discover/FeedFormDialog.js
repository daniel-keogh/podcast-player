import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

function FeedFormDialog(props) {
    return (
        <Dialog fullWidth open={props.open} onClose={props.onDialogClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the link to the RSS feed.
                </DialogContentText>
                <form onSubmit={props.onSubscribe}>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Feed URL"
                        margin="dense"
                        name="newFeed"
                        type="url"
                        error={props.error}
                        helperText={props.errorMessage}
                        onChange={props.onFormChange}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onDialogClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={props.onSubscribe}
                    color="primary"
                    type="submit"
                >
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FeedFormDialog;
