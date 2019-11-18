import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

function EpisodeListItem(props) {
    const handlePlay = () => {
        props.playEpisode({
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
                        <PlayCircleOutlineIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </React.Fragment>
    );
}

export default EpisodeListItem;