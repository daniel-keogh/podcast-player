import React from 'react';

const Audio = (props) => {
    return ( 
        <audio 
            ref={props.element} 
            onTimeUpdate={props.handleTimeUpdate}
            // controls
        >
            <source src={props.src}/>
        </audio>
    );
}
 
export default Audio;