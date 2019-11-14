import React from 'react';
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { PlayCircleOutline } from '@material-ui/icons';
import EpisodeDialog from '../EpisodeDialog/EpisodeDialog';

const EpisodeListItem = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlePlay = () => {
        props.enqueueEpisode({
            src: props.episode.audio.url,
            epTitle: props.episode.title,
            podTitle: props.episode.author
        });

        setOpen(false);
    };

    return (
        <React.Fragment>
            <ListItem button divider onClick={handleClickOpen}>
                <ListItemText
                    primary={props.episode.title}
                    secondary={new Date(props.episode.date).toDateString()}
                />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        color="secondary"
                        onClick={handlePlay}
                    >
                        <PlayCircleOutline />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <EpisodeDialog
                open={open}
                handleClose={handleClose}
                handlePlay={handlePlay}
                title={props.episode.title}
                summary={props.episode.summary}
            />
        </React.Fragment>
    );
}

export default EpisodeListItem;
