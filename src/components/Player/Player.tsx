import React, { Component } from "react";

// @ts-expect-error TS(2307): Cannot find module '@/components/Player/PlayerCont... Remove this comment to see the full error message
import PlayerControls from "@/components/Player/PlayerControls";
// @ts-expect-error TS(2307): Cannot find module '@/store/nowPlayingContext' or ... Remove this comment to see the full error message
import NowPlayingContext from "@/store/nowPlayingContext";

const SKIP_TIME = 30;

type State = any;

class Player extends Component<{}, State> {
  static contextType = NowPlayingContext;

  constructor(props: {}) {
    super(props);

    this.state = {
      currentTime: 0,
      duration: 0,
    };

    // Will allow the component to access properties of the HTML <audio> element.
// @ts-expect-error TS(7009): 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
(this as any).audioElement = new React.createRef();
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.savePlaybackProgress);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.savePlaybackProgress);
  }

  componentDidUpdate() {
    if ((this as any).audioElement.current && !(this as any).audioElement.current.paused && !this.context.src) {
      (this as any).audioElement.current.pause();
    }
  }

  render() {
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<React.Fragment>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <PlayerControls currentTime={this.state.currentTime} duration={this.state.duration} isPaused={(this as any).audioElement.current ? (this as any).audioElement.current.paused : true} onReplay={this.handleReplay} onForward={this.handleForward} onPlayPauseClicked={this.handlePlayPauseClicked} onSliderChange={this.handleSliderChange}/>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <audio preload="metadata" autoPlay={this.context.autoplay} src={this.context.src || null} onLoadedMetadata={this.handleMetadataLoaded} onTimeUpdate={this.handleTimeUpdate} ref={(this as any).audioElement}></audio>
      </React.Fragment>);
  }

  handlePlayPauseClicked = () => {
    if ((this as any).audioElement.current.paused) {
      (this as any).audioElement.current.play().catch(console.error);
    } else {
      if (!Number.isNaN(this.state.duration)) {
        (this as any).audioElement.current.pause();
      }
    }
  };

  handleReplay = () => {
    // If near the start of the file, set the current time to zero
    // (prevents currentTime being set to a negative number).
    if (this.state.currentTime - SKIP_TIME <= 0) {
      (this as any).audioElement.current.currentTime = 0;
    } else {
      (this as any).audioElement.current.currentTime -= SKIP_TIME;
    }
  };

  handleForward = () => {
    // If near the end of the file, set the current time to the total duration
    // (prevents currentTime being set to a number greater than the duration).
    if (this.state.currentTime + SKIP_TIME >= this.state.duration) {
      (this as any).audioElement.current.currentTime = this.state.duration;
    } else {
      (this as any).audioElement.current.currentTime += SKIP_TIME;
    }
  };

  handleMetadataLoaded = (e: any) => {
    (this as any).audioElement.current.currentTime = this.context.progress;
  };

  handleTimeUpdate = (e: any) => {
    this.setState({
    currentTime: e.target.currentTime,
    duration: (this as any).audioElement.current.duration,
});
  };

  // Syncs the slider with the current playback position.
  handleSliderChange = (e: any, value: any) => {
    // Convert the slider's new value property from a % to a time.
(this as any).audioElement.current.currentTime = this.state.duration * value * 0.01;

    this.setState({
    currentTime: (this as any).audioElement.current.currentTime,
});
  };

  savePlaybackProgress = (e: any) => {
    this.context.saveProgress(this.state.currentTime);
  };
}

export default Player;
