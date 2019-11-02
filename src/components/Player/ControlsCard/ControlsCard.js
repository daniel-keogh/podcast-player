import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Slider, ButtonGroup, IconButton, Typography } from '@material-ui/core';
import { PauseCircleFilled, PlayCircleFilled, SkipPrevious, SkipNext } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: '1 0 auto',
        whiteSpace: 'nowrap'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    playIcon: {
        height: 38,
        width: 38
    },
    seekbar: {
        display: 'flex',
        alignItems: 'center',
        flex: 'auto',
        margin: '0 36px'
    }
}));

const ControlsCard = (props) => {
    const classes = useStyles();

    return (
        <Card className="ControlsCard" style={{ display: "flex" }}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {props.epTitle}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {props.podTitle}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <ButtonGroup>
                        <IconButton onClick={props.handleRewind}>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton onClick={props.handlePlayBack}>
                            {(props.isPlaying) ? <PauseCircleFilled className={classes.playIcon} /> : <PlayCircleFilled className={classes.playIcon} />}
                        </IconButton>
                        <IconButton onClick={props.handleFastForward}>
                            <SkipNext />
                        </IconButton>
                    </ButtonGroup>
                </div>
            </div>
            <div className={classes.seekbar}>
                <Slider
                    defaultValue={0}
                    value={((props.currentTime / props.duration) * 100)}
                    marks={[
                        { value: 0, label: formatSeconds(props.currentTime) },
                        { value: 100, label: formatSeconds(props.duration) }
                    ]}
                    onChange={props.handleSliderChange}
                />
            </div>
        </Card>
    );
}

const formatSeconds = (secs) => {
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

export default ControlsCard;