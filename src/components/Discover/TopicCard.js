import React from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

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
    width: theme.spacing(8),
    height: theme.spacing(8),

    "& > *": {
      width: "100%",
      height: "100%",
    },
  },

  topicTitle: {
    marginTop: theme.spacing(2),
  },
}));

function TopicCard({ title, icon, onClick }) {
  const classes = useStyles();

  return (
    <Card elevation={0} variant="outlined" square>
      <CardActionArea onClick={(e) => onClick(e, title)}>
        <CardContent className={classes.topicContainer}>
          <Icon fontSize="large" className={classes.topicIcon} component="div">
            {icon}
          </Icon>

          <Typography variant="subtitle2" className={classes.topicTitle}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default TopicCard;
