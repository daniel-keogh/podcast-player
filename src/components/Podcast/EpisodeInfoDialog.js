import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import CalendarIcon from '@material-ui/icons/CalendarTodayTwoTone';
import CloseIcon from '@material-ui/icons/Close';

import SubscriptionItem from '@/components/Subscriptions/SubscriptionItem';

import axios from '@/config/axios';
import sanitize from 'sanitize-html';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
        '@media (max-width:500px)': {
            textAlign: 'center',
            marginTop: theme.spacing(2),
        },
    },
    headerTitle: {
        flex: '1',
        margin: theme.spacing(2),
    },
    headerArtwork: {
        '@media (max-width:500px)': {
            display: 'none',
        },
    },
    metaContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.spacing(2, 1, 0, 1),
        '& > *': {
            margin: theme.spacing(0, 1),
        },
        '& > button': {
            marginLeft: 'auto',
        },
        '@media (max-width:500px)': {
            '& > *': {
                margin: 0,
            },
        },
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[600],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {
        id,
        title,
        artwork,
        episode,
        date,
        onClose,
        onPlay,
        classes,
        ...other
    } = props;

    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <div className={classes.headerContainer}>
                <div className={classes.headerArtwork}>
                    <SubscriptionItem id={id} title={title} artwork={artwork} />
                </div>
                <div className={classes.headerTitle}>
                    <Typography variant="h6">{episode}</Typography>
                    <Typography variant="subtitle1">{title}</Typography>
                </div>
            </div>

            <Divider variant="fullWidth" />

            <div className={classes.metaContainer}>
                {date && (
                    <Chip
                        icon={<CalendarIcon />}
                        label={new Date(date).toDateString()}
                        variant="outlined"
                    />
                )}

                <Button
                    autoFocus
                    color="primary"
                    variant="contained"
                    disableElevation
                    endIcon={<PlayIcon />}
                    onClick={onPlay}
                >
                    Play
                </Button>
            </div>

            {onClose ? (
                <IconButton className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        height: '450px',
    },
}))(MuiDialogContent);

function EpisodeInfoDialog(props) {
    const [episodeInfo, setEpisodeInfo] = useState({
        title: '',
        description: '',
        date: '',
    });

    useEffect(() => {
        if (props.open) {
            const id = props.id;
            const guid = encodeURIComponent(props.episode.guid);

            axios
                .get(`/api/subscriptions/${id}/episodes/${guid}`)
                .then((res) => setEpisodeInfo({ ...res.data.episode }))
                .catch(console.error);
        }
    }, [props.open, props.id, props.episode.guid]);

    const handlePlay = () => {
        props.onPlay();
        props.onClose();
    };

    return (
        <Dialog onClose={props.onClose} open={props.open} fullWidth>
            <DialogTitle
                id={props.id}
                title={props.title}
                artwork={props.artwork}
                episode={episodeInfo.title}
                date={episodeInfo.date}
                onPlay={handlePlay}
                onClose={props.onClose}
            />
            <DialogContent dividers>
                <Typography
                    gutterBottom
                    dangerouslySetInnerHTML={{
                        __html: sanitize(episodeInfo.description),
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}

export default EpisodeInfoDialog;
