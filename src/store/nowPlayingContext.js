import React, { useState } from 'react';

const NowPlayingContext = React.createContext({
    src: '',
    epTitle: '',
    podTitle: '',
    podId: '',
    podArtwork: '',
    autoplay: false,
    playEpisode: ({ src, epTitle, podTitle, podId, podArtwork }) => { },
    stop: () => { },
});

const NOW_PLAYING_KEY = 'now-playing';

export function NowPlayingContextProvider(props) {
    const local = JSON.parse(localStorage.getItem(NOW_PLAYING_KEY)) || {};

    const { src, epTitle, podTitle, podId, podArtwork } = local;

    const [nowPlaying, setNowPlaying] = useState({
        src: src || '',
        epTitle: epTitle || '',
        podTitle: podTitle || '',
        podId: podId || '',
        podArtwork: podArtwork || '',
        autoplay: false,
    });

    const playEpisode = ({ src, epTitle, podTitle, podId, podArtwork }) => {
        setNowPlaying({
            src,
            epTitle,
            podTitle,
            podId,
            podArtwork,
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
            })
        );
    };

    const stop = () => {
        setNowPlaying({
            src: '',
            epTitle: '',
            podTitle: '',
            podId: '',
            podArtwork: '',
            autoplay: true,
        });
        localStorage.removeItem(NOW_PLAYING_KEY);
    };

    const context = {
        src: nowPlaying.src,
        epTitle: nowPlaying.epTitle,
        podTitle: nowPlaying.podTitle,
        podId: nowPlaying.podId,
        podArtwork: nowPlaying.podArtwork,
        autoplay: nowPlaying.autoplay,
        playEpisode,
        stop,
    };

    return (
        <NowPlayingContext.Provider value={{ ...context }}>
            {props.children}
        </NowPlayingContext.Provider>
    );
}

export default NowPlayingContext;
