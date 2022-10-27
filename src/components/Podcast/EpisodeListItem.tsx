import React, { useContext } from "react";

import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

// @ts-expect-error TS(2307): Cannot find module '@/components/EpisodeDialog/Epi... Remove this comment to see the full error message
import EpisodeDialog from "@/components/EpisodeDialog/EpisodeDialog";
// @ts-expect-error TS(2307): Cannot find module '@/store/nowPlayingContext' or ... Remove this comment to see the full error message
import NowPlayingContext from "@/store/nowPlayingContext";
// @ts-expect-error TS(2307): Cannot find module '@/hooks' or its corresponding ... Remove this comment to see the full error message
import { useDialog } from "@/hooks";

function EpisodeListItem(props: any) {
  const [dialog, handleOpen, handleClose] = useDialog({});
  const nowPlaying = useContext(NowPlayingContext);

  // Play the episode when the play button is clicked, by calling the `playEpisode` function passed as a prop.
  const handlePlay = () => {
    (nowPlaying as any).playEpisode({
    src: props.episode.audio.url,
    epTitle: props.episode.title,
    podTitle: props.podcastTitle,
    podId: props.id,
    podArtwork: props.artwork,
});
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.Fragment>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ListItem divider button onClick={handleOpen}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ListItemText
          primary={props.episode.title}
          secondary={new Date(props.episode.date).toDateString()}
        />
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ListItemSecondaryAction>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <IconButton edge="end" color="secondary" onClick={handlePlay} size="large">
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <PlayCircleOutlineIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {dialog.open && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
