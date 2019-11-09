import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button } from "@material-ui/core";

const EpisodeDialog = (props) => {
    return (
        <Dialog
            open={props.open}
            keepMounted
            onClose={props.handleClose}
        >
            <DialogTitle>
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.summary}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={props.handlePlay} color="secondary">
                    Play
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EpisodeDialog;