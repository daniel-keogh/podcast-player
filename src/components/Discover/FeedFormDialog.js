import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function FeedFormDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>Open form dialog</Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter the link to the RSS feed.</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="newFeed"
                        label="Feed"
                        type="url"
                        fullWidth
                        onChange={props.onFormChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={props.onSubscribe} color="primary" type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FeedFormDialog;