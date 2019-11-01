import React from 'react';

const Audio = (props) => {
    return ( 
        <audio 
            ref={props.element} 
            onTimeUpdate={props.handleTimeUpdate}
            onEnded={props.handlePlaybackEnd}
            //controls
        >
            <source src={props.src}/>
        </audio>
    );
}
 
export default Audio;