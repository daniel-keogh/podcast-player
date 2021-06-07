import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import NowPlayingContext from '../../store/nowPlayingContext';

function EpisodeListItem(props) {
    const nowPlaying = useContext(NowPlayingContext);

    // Play the episode when the play button is clicked, by calling the `playEpisode` function passed as a prop.
    const handlePlay = () => {
        nowPlaying.playEpisode({
            src: props.episode.audio.url,
            epTitle: props.episode.title,
            podTitle: props.podcastTitle,
            podId: props.id,
            podArtwork: props.artwork,
        });
    };

    return (
        <ListItem divider>
            <ListItemText
                primary={props.episode.title}
                secondary={new Date(props.episode.date).toDateString()}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" color="secondary" onClick={handlePlay}>
                    <PlayCircleOutlineIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default EpisodeListItem;
