import React, { useState } from "react";

type NowPlayingContextValue = {
  src: string;
  epTitle: string;
  podTitle: string;
  podId: string;
  podArtwork: string;
  progress: number;
  autoplay: boolean;
  playEpisode: (episode: NowPlaying) => void;
  stop: () => void;
  saveProgress: (progress: NowPlayingContextValue["progress"]) => void;
};

type NowPlaying = Pick<
  NowPlayingContextValue,
  "src" | "epTitle" | "podTitle" | "podId" | "podArtwork"
>;

type Props = {
  children: React.ReactNode;
};

const NowPlayingContext = React.createContext<NowPlayingContextValue>({
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

export function NowPlayingContextProvider(props: Props) {
  const local = JSON.parse(localStorage.getItem(NOW_PLAYING_KEY)!) || {};

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

  const playEpisode = ({ src, epTitle, podTitle, podId, podArtwork }: NowPlaying) => {
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

  const saveProgress = (progress: NowPlayingContextValue["progress"]) => {
    const tmp: NowPlaying = JSON.parse(localStorage.getItem(NOW_PLAYING_KEY)!);

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
