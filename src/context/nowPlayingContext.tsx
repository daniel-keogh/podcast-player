import React, { useState } from "react";

type NowPlayingContextValue = {
  audioUrl: string;
  episodeTitle: string;
  episodeGuid: string;
  podcastTitle: string;
  podcastId: string;
  podcastArtwork: string;
  progress: number;
  autoplay: boolean;
  isPaused: boolean;
  playEpisode: (episode: NowPlaying) => void;
  stop: () => void;
  saveProgress: (progress: NowPlayingContextValue["progress"]) => void;
  togglePause: (value: number) => void;
};

type NowPlaying = Pick<
  NowPlayingContextValue,
  "audioUrl" | "episodeTitle" | "episodeGuid" | "podcastTitle" | "podcastId" | "podcastArtwork"
>;

type Props = {
  children: React.ReactNode;
};

const NowPlayingContext = React.createContext<NowPlayingContextValue>({
  audioUrl: "",
  episodeTitle: "",
  episodeGuid: "",
  podcastTitle: "",
  podcastId: "",
  podcastArtwork: "",
  progress: 0,
  autoplay: false,
  isPaused: true,
  playEpisode: () => {},
  stop: () => {},
  saveProgress: () => {},
  togglePause: () => {},
});

const NOW_PLAYING_KEY = "now-playing";

export function NowPlayingContextProvider(props: Props) {
  const local = JSON.parse(localStorage.getItem(NOW_PLAYING_KEY)!) || {};

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
  }: NowPlaying) => {
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

  const togglePause = (value?: number) => {
    setNowPlaying(
      (state) =>
        ({
          ...state,
          isPaused: value ?? !state.isPaused,
        } as any)
    );
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
