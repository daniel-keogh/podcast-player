import { useContext, useEffect } from "react";

import AuthContext from "@/context/authContext";
import NowPlayingContext from "@/context/nowPlayingContext";
import historyService from "@/services/historyService";

import Player from "./Player";

const IS_COMPLETED_THRESHOLD = 97.5;

type PlayerContainerProps = {
  className?: string;
};

function PlayerContainer({ className }: PlayerContainerProps) {
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
      style={!auth.isAuthorized || nowPlaying.audioUrl === "" ? { display: "none" } : undefined}
    >
      <Player isPaused={nowPlaying.isPaused} onUpdateHistory={handleUpdateHistory} />
    </div>
  );
}

export default PlayerContainer;
