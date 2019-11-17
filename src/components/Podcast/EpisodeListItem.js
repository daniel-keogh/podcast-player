import React from 'react';
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { PlayCircleOutline } from '@material-ui/icons';

function EpisodeListItem(props) {
    const handlePlay = () => {
        props.enqueueEpisode({
            src: props.episode.audio.url,
            epTitle: props.episode.title,
            podTitle: props.podcastTitle
        });
    }

    return (
        <React.Fragment>
            <ListItem divider>
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
        </React.Fragment>
    );
}

export default EpisodeListItem;