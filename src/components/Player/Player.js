import React, { Component } from 'react';
import Audio from './Audio/Audio';
import ControlsCard from './ControlsCard/ControlsCard';

class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            epTitle: '',
            podTitle: '',
            src: '',
            isPlaying: false,
            skipTime: 30,
            currentTime: 0,
            duration: 0
        };

        // Will allow the component to access properties of the HTML <audio> element.
        this.audioElement = new React.createRef();
    }

    // Updates the state whenever the src prop changes (i.e. Whenever something new is about to be played).
    static getDerivedStateFromProps(props, state) {
        if (props.nowPlaying.src !== state.src) {
            return {
                ...props.nowPlaying,
                isPlaying: false
            };
        }
        return null;
    }

    render() {
        return (
            <React.Fragment>
                <ControlsCard
                    epTitle={this.state.epTitle}
                    podTitle={this.state.podTitle}
                    isPlaying={this.state.isPlaying}
                    currentTime={this.state.currentTime}
                    duration={this.state.duration}
                    handleRewind={this.handleRewind}
                    handleFastForward={this.handleFastForward}
                    handlePlayBack={this.handlePlayBack}
                    handleSliderChange={this.handleSliderChange}
                />
                <Audio
                    element={this.audioElement}
                    src={this.state.src}
                    handleTimeUpdate={this.handleTimeUpdate}
                    handlePlaybackEnd={this.handlePlaybackEnd}
                />
            </React.Fragment>
        );
    }

    handlePlayBack = () => {
        if (this.state.isPlaying) {
            this.audioElement.current.pause();
        } else {
            this.audioElement.current.play();
        }

        this.setState(state => ({
            isPlaying: !state.isPlaying
        }));
    }

    // Handle's the <audio> element's onEnded event.
    handlePlaybackEnd = () => {
        this.setState({
            isPlaying: false
        });
    }

    handleRewind = () => {
        // If near the start of the file, set the current time to zero (prevents currentTime being set to a negative number).
        if ((this.state.currentTime - this.state.skipTime) <= 0) {
            this.audioElement.current.currentTime = 0;

            this.setState({
                currentTime: 0
            });

            return;
        }

        this.audioElement.current.currentTime -= this.state.skipTime;

        this.setState({
            currentTime: this.audioElement.current.currentTime
        });
    }

    handleFastForward = () => {
        // If near the end of the file, set the current time to the total duration (prevents currentTime being set to a number greater than the duration).
        if ((this.state.currentTime + this.state.skipTime) >= this.state.duration) {
            this.audioElement.current.currentTime = this.state.duration;

            this.setState(state => ({
                currentTime: state.duration
            }));

            return;
        }

        this.audioElement.current.currentTime += this.state.skipTime;

        this.setState({
            currentTime: this.audioElement.current.currentTime
        });
    }

    // Syncs the slider with the current playback position.
    handleSliderChange = (e, value) => {
        // Convert the slider's new value property from a % to a time
        this.audioElement.current.currentTime = this.state.duration * value * 0.01;

        this.setState({
            currentTime: this.audioElement.current.currentTime
        });
    }

    // Handles the HTML <audio> onTimeUpdate event.
    handleTimeUpdate = (e) => {
        this.setState({
            currentTime: e.target.currentTime,
            duration: this.audioElement.current.duration
        });
    }
}

export default Player;