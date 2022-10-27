import React, { useContext, useEffect } from "react";

// @ts-expect-error TS(2307): Cannot find module '@/store/authContext' or its co... Remove this comment to see the full error message
import AuthContext from "@/store/authContext";
// @ts-expect-error TS(2307): Cannot find module '@/store/nowPlayingContext' or ... Remove this comment to see the full error message
import NowPlayingContext from "@/store/nowPlayingContext";

// @ts-expect-error TS(6142): Module './Player' was resolved to '/mnt/s/Github/p... Remove this comment to see the full error message
import Player from "./Player";

type Props = {
    className?: string;
};

function PlayerContainer({ className }: Props) {
  const nowPlaying = useContext(NowPlayingContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    // Set the page title based on what's playing
    if ((auth as any).isAuthorized && (nowPlaying as any).epTitle && (nowPlaying as any).podTitle) {
        document.title = `${(nowPlaying as any).epTitle} | ${(nowPlaying as any).podTitle} \u00b7 Podcast Player`;
    }
    else {
        document.title = "Podcast Player";
    }
}, [(auth as any).isAuthorized, (nowPlaying as any).epTitle, (nowPlaying as any).podTitle]);

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return (<div className={className} style={!(auth as any).isAuthorized || (nowPlaying as any).src === "" ? { display: "none" } : null}>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Player />
    </div>);
}

export default PlayerContainer;
