import React, { useContext } from "react";

import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

import EpisodeDialog from "@/components/EpisodeDialog/EpisodeDialog";
import NowPlayingContext from "@/store/nowPlayingContext";
import { useDialog } from "@/hooks";

function EpisodeListItem(props) {
  const [dialog, handleOpen, handleClose] = useDialog({});
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
      <ListItem divider button onClick={handleOpen}>
        <ListItemText
          primary={props.episode.title}
          secondary={new Date(props.episode.date).toDateString()}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" color="secondary" onClick={handlePlay} size="large">
            <PlayCircleOutlineIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {dialog.open && (
        <EpisodeDialog
          open={dialog.open}
          id={props.id}
          podcastTitle={props.podcastTitle}
          episodeTitle={props.episode?.title}
          episodeGuid={props.episode?.guid}
          artwork={props.artwork}
          onPlay={handlePlay}
          onClose={handleClose}
        />
      )}
    </React.Fragment>
  );
}

export default React.memo(EpisodeListItem);
