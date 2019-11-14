import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button } from "@material-ui/core";

const EpisodeDialog = (props) => {
    return (
        <Dialog
            keepMounted
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText dangerouslySetInnerHTML={{ __html: props.summary }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">Close</Button>
                <Button onClick={props.handlePlay} color="secondary">Play</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EpisodeDialog;