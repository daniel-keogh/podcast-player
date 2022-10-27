import React from "react";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    topicContainer: {
        height: 160,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    },
    topicIcon: {
        width: (theme as any).spacing(8),
        height: (theme as any).spacing(8),
        "& > *": {
            width: "100%",
            height: "100%",
        },
    },
    topicTitle: {
        marginTop: (theme as any).spacing(2),
    },
}));

type Props = {
    title: string;
    icon: React.ReactNode;
    onClick: (...args: any[]) => any;
};

function TopicCard({ title, icon, onClick }: Props) {
  const classes = useStyles();

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Card elevation={0} variant="outlined" square>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <CardActionArea onClick={(e) => onClick(e, title)}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <CardContent className={classes.topicContainer}>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Icon fontSize="large" className={classes.topicIcon} component="div">
            {icon}
          </Icon>

          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Typography variant="subtitle2" className={classes.topicTitle}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default TopicCard;
