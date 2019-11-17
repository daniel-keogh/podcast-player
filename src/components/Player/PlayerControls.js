import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Card, CardContent, Slider, Typography, } from '@material-ui/core';
import { PlayCircleFilled, PauseCircleFilled, Replay30, Forward30 } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    controlsLeft: {
        padding: '0 8px 0 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    controlsCenter: {
        padding: '0 32px 0 8px',
        textAlign: 'center',
        width: '100%',
        minWidth: 0
    },
    nowPlaying: {
        whiteSpace: 'nowrap'
    },
    seekbar: {
        width: '90%'
    },
    playIcon: {
        height: '52px',
        width: '52px'
    }
}));

function PlayerControls(props) {
    const classes = useStyles();

    return (
        <Card className="ControlsCard" elevation={3}>
            <div className={classes.controlsLeft}>
                <ButtonGroup variant="text">
                    <Button onClick={props.onReplay}>
                        <Replay30 fontSize="large" />
                    </Button>
                    <Button onClick={props.onPlayPauseClicked} color="primary">
                        {props.isPaused ? <PlayCircleFilled className={classes.playIcon} /> : <PauseCircleFilled className={classes.playIcon} />}
                    </Button>
                    <Button onClick={props.onForward}>
                        <Forward30 fontSize="large" />
                    </Button>
                </ButtonGroup>
            </div>
            <div className={classes.controlsCenter}>
                <CardContent className={classes.nowPlaying}>
                    <Typography component="h6" variant="h6" noWrap>
                        {props.epTitle}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle2" noWrap>
                        {props.podTitle}
                    </Typography>
                </CardContent>
                <Slider
                    className={classes.seekbar}
                    defaultValue={0}
                    value={(props.currentTime / props.duration) * 100}
                    marks={[
                        {
                            value: 0,
                            label: formatSeconds(props.currentTime)
                        },
                        {
                            value: 100,
                            label: formatSeconds(props.duration)
                        }
                    ]}
                    onChange={props.onSliderChange}
                />
            </div>
        </Card >
    );
}

// Based on this S.O. answer:
// https://stackoverflow.com/a/37096512
function formatSeconds(secs) {
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

export default PlayerControls;