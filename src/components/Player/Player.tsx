import React, { Component } from "react";

import PlayerControls from "@/components/Player/PlayerControls";
import NowPlayingContext from "@/context/nowPlayingContext";

const SKIP_TIME = 30;

export type PlayerProps = {};

class Player extends Component<PlayerProps> {
  static contextType = NowPlayingContext;

  private audioElement: React.RefObject<HTMLAudioElement>;

  state = {
    currentTime: 0,
    duration: 0,
  };

  constructor(props: PlayerProps) {
    super(props);

    // Will allow the component to access properties of the HTML <audio> element.
    this.audioElement = React.createRef();
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
    if (!this.audioElement.current) return;

    if (this.audioElement.current.paused) {
      this.audioElement.current.play().catch(console.error);
    } else {
      if (!Number.isNaN(this.state.duration)) {
        this.audioElement.current.pause();
      }
    }
  };

  handleReplay = () => {
    if (!this.audioElement.current) return;

    // If near the start of the file, set the current time to zero
    // (prevents currentTime being set to a negative number).
    if (this.state.currentTime - SKIP_TIME <= 0) {
      this.audioElement.current.currentTime = 0;
    } else {
      this.audioElement.current.currentTime -= SKIP_TIME;
    }
  };

  handleForward = () => {
    if (!this.audioElement.current) return;

    // If near the end of the file, set the current time to the total duration
    // (prevents currentTime being set to a number greater than the duration).
    if (this.state.currentTime + SKIP_TIME >= this.state.duration) {
      this.audioElement.current.currentTime = this.state.duration;
    } else {
      this.audioElement.current.currentTime += SKIP_TIME;
    }
  };

  handleMetadataLoaded = () => {
    if (!this.audioElement.current) return;
    this.audioElement.current.currentTime = this.context.progress;
  };

  handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    if (!this.audioElement.current) return;

    this.setState({
      currentTime: (e.target as HTMLAudioElement).currentTime,
      duration: this.audioElement.current.duration,
    });
  };

  // Syncs the slider with the current playback position.
  handleSliderChange = (_: Event, value: number | number[]) => {
    if (!this.audioElement.current || Array.isArray(value)) return;

    // Convert the slider's new value property from a % to a time.
    this.audioElement.current.currentTime = this.state.duration * value * 0.01;

    this.setState({
      currentTime: this.audioElement.current.currentTime,
    });
  };

  savePlaybackProgress = () => {
    this.context.saveProgress(this.state.currentTime);
  };
}

export default Player;
