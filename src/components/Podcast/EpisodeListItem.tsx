import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import FadeTransition from "@mui/material/Fade";

import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

import NowPlayingContext from "@/context/nowPlayingContext";
import { useDialog } from "@/hooks";

import historyService from "@/services/historyService";

import type { Episode } from "@/types/api/podcast";
import { LazyComponent } from "@/components/LazyComponent";

export type EpisodeListItemProps = {
  artwork: string;
  episode: Episode;
  podcastId: string;
  podcastTitle: string;
  date: string;
  isPlaylistItem?: boolean;
};

function EpisodeListItem({
  podcastId,
  podcastTitle,
  artwork,
  episode,
  date,
  isPlaylistItem = false,
  ...props
}: EpisodeListItemProps) {
  const [isFavourited, setIsFavourited] = useState(props.isFavourited);
  const [isCompleted, setIsCompleted] = useState(props.isCompleted);

  const [dialog, handleOpen, handleClose] = useDialog({});
  const [starVisibility, setStarVisibility] = useState(isFavourited);

  const nowPlaying = useContext(NowPlayingContext);

  const isPlaying = nowPlaying.episodeGuid === episode.guid;

  useEffect(() => {
    setIsCompleted(props.isCompleted);
    setIsFavourited(props.isFavourited);
  }, [props.isCompleted, props.isFavourited]);

  // Play the episode when the play button is clicked, by calling the `playEpisode` function passed as a prop.
  const handlePlay = useCallback(() => {
    nowPlaying.playEpisode({
      audioUrl: episode.audioUrl || episode.audio.url,
      episodeTitle: episode.title,
      episodeGuid: episode.guid,
      podcastTitle,
      podcastId,
      podcastArtwork: artwork,
    });
  }, [
    episode.audioUrl,
    episode.audio,
    episode.title,
    episode.guid,
    artwork,
    nowPlaying,
    podcastId,
    podcastTitle,
  ]);

  const handlePause = useCallback(() => {
    nowPlaying.togglePause(true);
  }, []);

  const handleFavourite = useCallback(async () => {
    await historyService.addEpisodeToHistory({
      podcastId,
      title: episode.title,
      guid: episode.guid,
      audioUrl: episode.audioUrl || episode.audio.url,
      isFavourited: !isFavourited,
    });
    setIsFavourited((state) => !state);
  }, [episode.audioUrl, episode.audio, episode.title, episode.guid, podcastId, isFavourited]);

  const handleItemClicked = useCallback(() => {
    if (starVisibility) {
      setStarVisibility(false);
    }
    handleOpen();
  }, [starVisibility]);

  return (
    <div onMouseEnter={() => setStarVisibility(true)} onMouseLeave={() => setStarVisibility(false)}>
      <ListItem divider button onClick={handleItemClicked} color="success">
        {isPlaylistItem ? (
          <ListItemAvatar>
            <Avatar src={artwork} variant="square" />
          </ListItemAvatar>
        ) : isPlaying ? (
          <FadeTransition in={isPlaying}>
            <ListItemIcon>
              <GraphicEqIcon color="primary" />
            </ListItemIcon>
          </FadeTransition>
        ) : null}

        <ListItemText
          primary={episode.title}
          primaryTypographyProps={{
            color: isCompleted ? "lightgray" : "",
          }}
          secondary={new Date(date).toDateString()}
          secondaryTypographyProps={{
            color: isCompleted ? "lightgray" : "GrayText",
          }}
        />
        <ListItemSecondaryAction>
          <FadeTransition in={starVisibility || isFavourited}>
            <IconButton edge="start" color="secondary" onClick={handleFavourite} size="large">
              {isFavourited ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </FadeTransition>
          {isPlaying && !nowPlaying.isPaused ? (
            <IconButton edge="end" color="primary" onClick={handlePause} size="large">
              <PauseCircleOutlineIcon />
            </IconButton>
          ) : (
            <IconButton edge="end" color="primary" onClick={handlePlay} size="large">
              <PlayCircleOutlineIcon />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>

      {dialog.open && (
        <LazyComponent>
          {({ EpisodeDialog }) => (
            <EpisodeDialog
              open={dialog.open}
              id={props.id}
              podcastTitle={podcastTitle}
              episodeTitle={episode.title}
              episodeGuid={episode.guid}
              artwork={artwork}
              onPlay={handlePlay}
              onClose={handleClose}
            />
          )}
        </LazyComponent>
      )}
    </div>
  );
}

EpisodeListItem.propTypes = {
  podcastId: PropTypes.string.isRequired,
  podcastTitle: PropTypes.string.isRequired,
  episode: PropTypes.shape({
    title: PropTypes.string,
    audioUrl: PropTypes.string,
    guid: PropTypes.string,
  }).isRequired,
  artwork: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
  isFavourited: PropTypes.bool,
  isPlaylistItem: PropTypes.bool,
};

export default React.memo(EpisodeListItem);
