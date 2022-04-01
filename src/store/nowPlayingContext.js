import React, { useState } from "react";

const NowPlayingContext = React.createContext({
  src: "",
  epTitle: "",
  podTitle: "",
  podId: "",
  podArtwork: "",
  progress: 0,
  autoplay: false,
  playEpisode: ({ src, epTitle, podTitle, podId, podArtwork }) => {},
  stop: () => {},
  saveProgress: (progress) => {},
});

const NOW_PLAYING_KEY = "now-playing";

export function NowPlayingContextProvider(props) {
  const local = JSON.parse(localStorage.getItem(NOW_PLAYING_KEY)) || {};

  const { src, epTitle, podTitle, podId, podArtwork, progress } = local;

  const [nowPlaying, setNowPlaying] = useState({
    src: src || "",
    epTitle: epTitle || "",
    podTitle: podTitle || "",
    podId: podId || "",
    podArtwork: podArtwork || "",
    progress: progress || 0,
    autoplay: false,
  });

  const playEpisode = ({ src, epTitle, podTitle, podId, podArtwork }) => {
    setNowPlaying({
      src,
      epTitle,
      podTitle,
      podId,
      podArtwork,
      progress: 0,
      autoplay: true,
    });

    localStorage.setItem(
      NOW_PLAYING_KEY,
      JSON.stringify({
        src,
        epTitle,
        podTitle,
        podId,
        podArtwork,
        progress: 0,
      })
    );
  };

  const stop = () => {
    setNowPlaying({
      src: "",
      epTitle: "",
      podTitle: "",
      podId: "",
      podArtwork: "",
      progress: 0,
      autoplay: true,
    });
    localStorage.removeItem(NOW_PLAYING_KEY);
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
    src: nowPlaying.src,
    epTitle: nowPlaying.epTitle,
    podTitle: nowPlaying.podTitle,
    podId: nowPlaying.podId,
    podArtwork: nowPlaying.podArtwork,
    progress: nowPlaying.progress,
    autoplay: nowPlaying.autoplay,
    playEpisode,
    stop,
    saveProgress,
  };

  return (
    <NowPlayingContext.Provider value={{ ...context }}>{props.children}</NowPlayingContext.Provider>
  );
}

export default NowPlayingContext;
