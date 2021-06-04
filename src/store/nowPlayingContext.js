import React, { useState } from 'react';

const NowPlayingContext = React.createContext({
    src: '',
    epTitle: '',
    podTitle: '',
    playEpisode: ({ src, epTitle, podTitle }) => {},
    stop: () => {},
});

const NOW_PLAYING_KEY = 'now-playing';

export function NowPlayingContextProvider(props) {
    const local = JSON.parse(localStorage.getItem(NOW_PLAYING_KEY));

    const [nowPlaying, setNowPlaying] = useState({
        src: local?.src || '',
        epTitle: local?.epTitle || '',
        podTitle: local?.podTitle || '',
    });

    const playEpisode = ({ src, epTitle, podTitle }) => {
        setNowPlaying({ src, epTitle, podTitle });

        localStorage.setItem(
            NOW_PLAYING_KEY,
            JSON.stringify({
                src,
                epTitle,
                podTitle,
            })
        );
    };

    const stop = () => {
        setNowPlaying({ src: '', epTitle: '', podTitle: '' });
        localStorage.removeItem(NOW_PLAYING_KEY);
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
