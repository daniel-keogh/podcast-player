import React from 'react';
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { PlayCircleFilled } from '@material-ui/icons';

const EpisodeListItem = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePlay = () => {
        // TODO play this episode
        setOpen(false);
    };

    return (
        <React.Fragment>
            <ListItem button divider onClick={handleClickOpen}>
                <ListItemText
                    primary={props.episode.title}
                    secondary={new Date(props.episode.date).toLocaleString()}
                />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        color="secondary"
                        onClick={handlePlay}
                    >
                        <PlayCircleFilled />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle>{props.episode.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.episode.summary}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handlePlay} color="secondary">
                        Play
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default EpisodeListItem;
