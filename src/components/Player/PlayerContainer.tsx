import { useContext, useEffect } from "react";

import AuthContext from "@/context/authContext";
import NowPlayingContext from "@/context/nowPlayingContext";

import Player from "./Player";

type PlayerContainerProps = {
  className?: string;
};

function PlayerContainer({ className }: PlayerContainerProps) {
  const nowPlaying = useContext(NowPlayingContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    // Set the page title based on what's playing
    if (auth.isAuthorized && nowPlaying.epTitle && nowPlaying.podTitle) {
      document.title = `${nowPlaying.epTitle} | ${nowPlaying.podTitle} \u00b7 Podcast Player`;
    } else {
      document.title = "Podcast Player";
    }
  }, [auth.isAuthorized, nowPlaying.epTitle, nowPlaying.podTitle]);

  return (
    <div
      className={className}
      style={!auth.isAuthorized || nowPlaying.src === "" ? { display: "none" } : undefined}
    >
      <Player />
    </div>
  );
}

export default PlayerContainer;
