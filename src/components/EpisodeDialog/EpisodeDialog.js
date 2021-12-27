import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Skeleton from '@material-ui/lab/Skeleton';

import subscriptionsService from '@/services/subscriptionsService';
import EpisodeDialogTitle from './EpisodeDialogTitle';

import sanitize from 'sanitize-html';

const EpisodeDialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        height: '450px',
    },
}))(MuiDialogContent);

function EpisodeDialog({
    open,
    id,
    episodeTitle,
    episodeGuid,
    podcastTitle,
    artwork,
    onPlay,
    onClose,
    ...props
}) {
    const [episodeInfo, setEpisodeInfo] = useState({
        description: '',
        date: '',
    });

    useEffect(() => {
        if (open) {
            subscriptionsService
                .getEpisodeByGuid(id, episodeGuid)
                .then((data) => {
                    let description = sanitize(data.episode.description);

                    if (description === 'undefined') {
                        description = 'Failed to load episode description.';
                    }

                    setEpisodeInfo({
                        date: data.episode.date,
                        description,
                    });
                })
                .catch(console.error);
        }
    }, [open, id, episodeGuid]);

    return (
        <Dialog onClose={onClose} open={open} fullWidth>
            <EpisodeDialogTitle
                id={id}
                podcastTitle={podcastTitle}
                episodeTitle={episodeTitle}
                artwork={artwork}
                date={episodeInfo.date}
                onPlay={() => onPlay() & onClose()}
                onClose={onClose}
            />
            <EpisodeDialogContent dividers>
                {!episodeInfo.description ? (
                    Array.from(Array(12).keys()).map((i) =>
                        i % 5 === 0 ? (
                            <br key={i} />
                        ) : (
                            <Skeleton variant="text" key={i} />
                        )
                    )
                ) : (
                    <Typography
                        gutterBottom
                        dangerouslySetInnerHTML={{
                            __html: episodeInfo.description,
                        }}
                    />
                )}
            </EpisodeDialogContent>
        </Dialog>
    );
}

export default EpisodeDialog;
