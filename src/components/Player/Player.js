import React, { Component } from "react";

import PlayerControls from "@/components/Player/PlayerControls";
import NowPlayingContext from "@/store/nowPlayingContext";

const SKIP_TIME = 30;

class Player extends Component {
  static contextType = NowPlayingContext;

  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
      duration: 0,
    };

    // Will allow the component to access properties of the HTML <audio> element.
    this.audioElement = new React.createRef();
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.savePlaybackProgress);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.savePlaybackProgress);
  }

  componentDidUpdate() {
    if (this.audioElement.current && !this.audioElement.current.paused && !this.context.src) {
      this.audioElement.current.pause();
    }
  }

  render() {
    return (
      <React.Fragment>
        <PlayerControls
          currentTime={this.state.currentTime}
          duration={this.state.duration}
          isPaused={this.audioElement.current ? this.audioElement.current.paused : true}
          onReplay={this.handleReplay}
          onForward={this.handleForward}
          onPlayPauseClicked={this.handlePlayPauseClicked}
          onSliderChange={this.handleSliderChange}
        />
        <audio
          preload="metadata"
          autoPlay={this.context.autoplay}
          src={this.context.src || null}
          onLoadedMetadata={this.handleMetadataLoaded}
          onTimeUpdate={this.handleTimeUpdate}
          ref={this.audioElement}
        ></audio>
      </React.Fragment>
    );
  }

  handlePlayPauseClicked = () => {
    if (this.audioElement.current.paused) {
      this.audioElement.current.play().catch(console.error);
    } else {
      if (!Number.isNaN(this.state.duration)) {
        this.audioElement.current.pause();
      }
    }
  };

  handleReplay = () => {
    // If near the start of the file, set the current time to zero
    // (prevents currentTime being set to a negative number).
    if (this.state.currentTime - SKIP_TIME <= 0) {
      this.audioElement.current.currentTime = 0;
    } else {
      this.audioElement.current.currentTime -= SKIP_TIME;
    }
  };

  handleForward = () => {
    // If near the end of the file, set the current time to the total duration
    // (prevents currentTime being set to a number greater than the duration).
    if (this.state.currentTime + SKIP_TIME >= this.state.duration) {
      this.audioElement.current.currentTime = this.state.duration;
    } else {
      this.audioElement.current.currentTime += SKIP_TIME;
    }
  };

  handleMetadataLoaded = (e) => {
    this.audioElement.current.currentTime = this.context.progress;
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
    this.audioElement.current.currentTime = this.state.duration * value * 0.01;

    this.setState({
      currentTime: this.audioElement.current.currentTime,
    });
  };

  savePlaybackProgress = (e) => {
    this.context.saveProgress(this.state.currentTime);
  };
}

export default Player;
