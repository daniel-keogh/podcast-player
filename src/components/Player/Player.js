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

        this.audioElement = new React.createRef();
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
            isPlaying: !state.isPlaying,
            duration: this.audioElement.current.duration
        }));
    }

    handlePlaybackEnd = () => {
        this.setState({
            isPlaying: false
        });
    }

    handleRewind = () => {
        if ((this.state.currentTime - this.state.skipTime) <= 0) {
            this.audioElement.current.currentTime = 0;

            this.setState({
                currentTime: 0
            });

            return;
        }

        this.audioElement.current.currentTime -= this.state.skipTime;

        this.setState(state => ({
            currentTime: state.currentTime - this.state.skipTime
        }));
    }

    handleFastForward = () => {
        if ((this.state.currentTime + this.state.skipTime) >= this.state.duration) {
            this.audioElement.current.currentTime = this.state.duration;

            this.setState(state => ({
                currentTime: state.duration
            }));

            return;
        }

        this.audioElement.current.currentTime += this.state.skipTime;

        this.setState(state => ({
            currentTime: state.currentTime + this.state.skipTime
        }));
    }

    handleSliderChange = (e, value) => {
        this.audioElement.current.currentTime = this.state.duration * value * 0.01;

        this.setState(state => ({
            currentTime: state.duration * value * 0.01
        }));
    }

    handleTimeUpdate = (e) => {
        this.setState({
            currentTime: e.target.currentTime
        });
    }
}
 
export default Player;