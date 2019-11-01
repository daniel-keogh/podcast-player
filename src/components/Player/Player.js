import React, { Component } from 'react';
import { Slider, IconButton, ButtonGroup, Typography } from '@material-ui/core';
import { PlayCircleFilled, FastRewind, FastForward, PauseCircleFilled } from '@material-ui/icons';
import Audio from '../Audio/Audio';
import "./Player.css";

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
                <div className="controls">
                    <div className="controls-left">
                        <ButtonGroup>
                            <IconButton onClick={this.handleRewind}>
                                <FastRewind />
                            </IconButton>
                            <IconButton onClick={this.handlePlayBack}>
                                {(this.state.isPlaying) ? <PauseCircleFilled /> : <PlayCircleFilled />}
                            </IconButton>
                            <IconButton onClick={this.handleFastForward}>
                                <FastForward />
                            </IconButton>
                        </ButtonGroup>
                    </div>
                    <div className="controls-center">
                        <div className="episode-title">
                            <Typography variant="h6">{this.state.epTitle}</Typography>
                        </div>
                        <div className="podcast-title">
                            <Typography variant="overline">{this.state.podTitle}</Typography>
                        </div>
                        <div className="seek">
                            <Slider
                                defaultValue={0} 
                                value={this.timeAsPercent()}
                                marks={[
                                    {value: 0, label: this.formatSeconds(this.state.currentTime)},
                                    {value: 100, label: this.formatSeconds(this.state.duration)}
                                ]}
                                onChange={this.handleSliderChange}
                            />
                        </div>
                    </div>
                </div>
                <Audio
                    element={this.audioElement}
                    handleTimeUpdate={this.handleTimeUpdate}
                    handlePlaybackEnd={this.handlePlaybackEnd}
                    src={this.state.src}
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

    handlePlaybackEnd = () => {
        this.setState({
            isPlaying: false
        });
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

    timeAsPercent = () => {
        return ((this.state.currentTime / this.state.duration) * 100);
    }

    formatSeconds = (secs) => {
        if (Number.isNaN(secs))
            return '00:00';

        const h = String(Math.floor(secs / 3600)).padStart(2, '0');
        const m = String(Math.floor(secs % 3600 / 60)).padStart(2, '0');
        const s = String(Math.floor(secs % 3600 % 60)).padStart(2, '0');
    
        if (h === '00') {
            return `${m}:${s}`;
        }
        return `${h}:${m}:${s}`;
    }
}
 
export default Player;