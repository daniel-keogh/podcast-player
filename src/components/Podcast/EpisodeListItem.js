import React, { useContext, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import EpisodeInfoDialog from './EpisodeInfoDialog';
import NowPlayingContext from '../../store/nowPlayingContext';

function EpisodeListItem(props) {
    const [dialogOpen, setDialogOpen] = useState(false);
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
        <React.Fragment>
            <ListItem divider button onClick={() => setDialogOpen(true)}>
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
            <EpisodeInfoDialog
                open={dialogOpen}
                id={props.id}
                title={props.podcastTitle}
                artwork={props.artwork}
                episode={props.episode}
                onPlay={handlePlay}
                onClose={() => setDialogOpen(false)}
            />
        </React.Fragment>
    );
}

export default EpisodeListItem;
