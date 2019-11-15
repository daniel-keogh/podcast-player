import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button } from "@material-ui/core";

function EpisodeDialog(props) {
    return (
        <Dialog
            keepMounted
            open={props.open}
            onClose={props.onClose}
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText dangerouslySetInnerHTML={{ __html: props.summary }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">Close</Button>
                <Button onClick={props.onPlay} color="secondary">Play</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EpisodeDialog;