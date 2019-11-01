import React from 'react';

const Audio = (props) => {
    return ( 
        <audio 
            ref={props.element} 
            onTimeUpdate={props.handleTimeUpdate}
            onEnded={props.handlePlaybackEnd}
            src={props.src}
            //controls
        >
        </audio>
    );
}
 
export default Audio;