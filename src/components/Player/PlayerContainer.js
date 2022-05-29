import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import AuthContext from "@/store/authContext";
import NowPlayingContext from "@/store/nowPlayingContext";
import historyService from "@/services/historyService";
import Player from "./Player";

const IS_COMPLETED_THRESHOLD = 97.5;

function PlayerContainer({ className }) {
  const nowPlaying = useContext(NowPlayingContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    // Set the page title based on what's playing
    if (auth.isAuthorized && nowPlaying.episodeTitle && nowPlaying.podcastTitle) {
      document.title = `${nowPlaying.episodeTitle} | ${nowPlaying.podcastTitle} \u00b7 Podcast Player`;
    } else {
      document.title = "Podcast Player";
    }
  }, [auth.isAuthorized, nowPlaying.episodeTitle, nowPlaying.podcastTitle]);

  const handleUpdateHistory = (currentTime, duration) => {
    const progress = (currentTime / duration) * 100;

    historyService
      .addEpisodeToHistory({
        podcastId: nowPlaying.podcastId,
        audioUrl: nowPlaying.audioUrl,
        guid: nowPlaying.episodeGuid,
        title: nowPlaying.episodeTitle,
        isCompleted: progress >= IS_COMPLETED_THRESHOLD,
        progress,
      })
      .catch(console.error);
  };

  return (
    <div
      className={className}
      style={!auth.isAuthorized || nowPlaying.audioUrl === "" ? { display: "none" } : null}
    >
      <Player isPaused={nowPlaying.isPaused} onUpdateHistory={handleUpdateHistory} />
    </div>
  );
}

PlayerContainer.propTypes = {
  className: PropTypes.string,
};

export default PlayerContainer;
