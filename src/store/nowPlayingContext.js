import React, { useState } from 'react';

const NowPlayingContext = React.createContext({
    src: '',
    epTitle: '',
    podTitle: '',
    playEpisode: ({ src, epTitle, podTitle }) => {},
    stop: () => {},
});

export function NowPlayingContextProvider(props) {
    const [nowPlaying, setNowPlaying] = useState({
        src: '',
        epTitle: '',
        podTitle: '',
    });

    const playEpisode = ({ src, epTitle, podTitle }) => {
        setNowPlaying({ src, epTitle, podTitle });
    };

    const stop = () => {
        setNowPlaying({ src: '', epTitle: '', podTitle: '' });
    };

    const context = {
        src: nowPlaying.src,
        epTitle: nowPlaying.epTitle,
        podTitle: nowPlaying.podTitle,
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
