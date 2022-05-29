import React, { useState } from "react";

const NowPlayingContext = React.createContext({
  audioUrl: "",
  episodeTitle: "",
  episodeGuid: "",
  podcastTitle: "",
  podcastId: "",
  podcastArtwork: "",
  progress: 0,
  autoplay: false,
  isPaused: true,
  playEpisode: ({
    audioUrl,
    episodeTitle,
    episodeGuid,
    podcastTitle,
    podcastId,
    podcastArtwork,
  }) => {},
  stop: () => {},
  saveProgress: (progress) => {},
  togglePause: (value) => {},
});

const NOW_PLAYING_KEY = "now-playing";

export function NowPlayingContextProvider(props) {
  const local = JSON.parse(localStorage.getItem(NOW_PLAYING_KEY)) || {};

  const { audioUrl, episodeTitle, episodeGuid, podcastTitle, podcastId, podcastArtwork, progress } =
    local;

  const [nowPlaying, setNowPlaying] = useState({
    audioUrl: audioUrl || "",
    episodeTitle: episodeTitle || "",
    episodeGuid: episodeGuid || "",
    podcastTitle: podcastTitle || "",
    podcastId: podcastId || "",
    podcastArtwork: podcastArtwork || "",
    progress: progress || 0,
    autoplay: false,
    isPaused: true,
  });

  const playEpisode = ({
    audioUrl,
    episodeTitle,
    episodeGuid,
    podcastTitle,
    podcastId,
    podcastArtwork,
  }) => {
    const common = {
      audioUrl,
      episodeTitle,
      episodeGuid,
      podcastTitle,
      podcastId,
      podcastArtwork,
      progress: 0,
    };

    setNowPlaying({
      ...common,
      autoplay: true,
      isPaused: false,
    });

    localStorage.setItem(NOW_PLAYING_KEY, JSON.stringify(common));
  };

  const stop = () => {
    setNowPlaying({
      audioUrl: "",
      episodeTitle: "",
      episodeGuid: "",
      podcastTitle: "",
      podcastId: "",
      podcastArtwork: "",
      progress: 0,
      autoplay: true,
      isPaused: false,
    });
    localStorage.removeItem(NOW_PLAYING_KEY);
  };

  const togglePause = (value) => {
    setNowPlaying((state) => ({
      ...state,
      isPaused: value ?? !state.isPaused,
    }));
  };

  const saveProgress = (progress) => {
    const tmp = JSON.parse(localStorage.getItem(NOW_PLAYING_KEY));

    localStorage.setItem(
      NOW_PLAYING_KEY,
      JSON.stringify({
        ...tmp,
        progress,
      })
    );
  };

  const context = {
    audioUrl: nowPlaying.audioUrl,
    episodeTitle: nowPlaying.episodeTitle,
    episodeGuid: nowPlaying.episodeGuid,
    podcastTitle: nowPlaying.podcastTitle,
    podcastId: nowPlaying.podcastId,
    podcastArtwork: nowPlaying.podcastArtwork,
    progress: nowPlaying.progress,
    autoplay: nowPlaying.autoplay,
    isPaused: nowPlaying.isPaused,
    playEpisode,
    stop,
    saveProgress,
    togglePause,
  };

  return (
    <NowPlayingContext.Provider value={{ ...context }}>{props.children}</NowPlayingContext.Provider>
  );
}

export default NowPlayingContext;
