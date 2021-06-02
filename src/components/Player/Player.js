import React, { Component } from 'react';
import PlayerControls from './PlayerControls';
import NowPlayingContext from '../../store/nowPlayingContext';

class Player extends Component {
    static contextType = NowPlayingContext;

    constructor(props) {
        super(props);

        this.state = {
            skipTime: 30,
            currentTime: 0,
            duration: 0,
        };

        // Will allow the component to access properties of the HTML <audio> element.
        this.audioElement = new React.createRef();
    }

    render() {
        return (
            <React.Fragment>
                <PlayerControls
                    epTitle={this.context.epTitle}
                    podTitle={this.context.podTitle}
                    currentTime={this.state.currentTime}
                    duration={this.state.duration}
                    isPaused={
                        this.audioElement.current
                            ? this.audioElement.current.paused
                            : true
                    }
                    onReplay={this.handleReplay}
                    onForward={this.handleForward}
                    onPlayPauseClicked={this.handlePlayPauseClicked}
                    onSliderChange={this.handleSliderChange}
                />
                <audio
                    autoPlay
                    src={this.context.src || null}
                    onTimeUpdate={this.handleTimeUpdate}
                    ref={this.audioElement}
                ></audio>
            </React.Fragment>
        );
    }

    handlePlayPauseClicked = () => {
        if (this.audioElement.current.paused) {
            this.audioElement.current.play().catch((e) => {
                console.error(e.message);
            });
        } else {
            if (!Number.isNaN(this.state.duration)) {
                this.audioElement.current.pause();
            }
        }
    };

    handleReplay = () => {
        // If near the start of the file, set the current time to zero
        // (prevents currentTime being set to a negative number).
        if (this.state.currentTime - this.state.skipTime <= 0) {
            this.audioElement.current.currentTime = 0;
        } else {
            this.audioElement.current.currentTime -= this.state.skipTime;
        }
    };

    handleForward = () => {
        // If near the end of the file, set the current time to the total duration
        // (prevents currentTime being set to a number greater than the duration).
        if (
            this.state.currentTime + this.state.skipTime >=
            this.state.duration
        ) {
            this.audioElement.current.currentTime = this.state.duration;
        } else {
            this.audioElement.current.currentTime += this.state.skipTime;
        }
    };

    handleTimeUpdate = (e) => {
        this.setState({
            currentTime: e.target.currentTime,
            duration: this.audioElement.current.duration,
        });
    };

    // Syncs the slider with the current playback position.
    handleSliderChange = (e, value) => {
        // Convert the slider's new value property from a % to a time.
        this.audioElement.current.currentTime =
            this.state.duration * value * 0.01;

        this.setState({
            currentTime: this.audioElement.current.currentTime,
        });
    };
}

export default Player;
