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
        <Dialog open={props.open} onClose={props.onDialogClose} fullWidth>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>Enter the link to the RSS feed.</DialogContentText>
                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    id="newFeed"
                    label="Feed URL"
                    type="url"
                    error={props.error}
                    value={props.newFeed}
                    onChange={props.onFormChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onDialogClose} color="primary">Cancel</Button>
                <Button onClick={props.onSubscribe} color="primary">Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
}

export default FeedFormDialog;