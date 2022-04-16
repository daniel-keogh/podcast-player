import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import AuthContext from "@/store/authContext";
import NowPlayingContext from "@/store/nowPlayingContext";

import Player from "./Player";

function PlayerContainer({ className }) {
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
      style={!auth.isAuthorized || nowPlaying.src === "" ? { display: "none" } : null}
    >
      <Player />
    </div>
  );
}

PlayerContainer.propTypes = {
  className: PropTypes.string,
};

export default PlayerContainer;
