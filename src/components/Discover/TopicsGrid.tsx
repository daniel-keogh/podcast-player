import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import BooksIcon from "@mui/icons-material/BookOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import TechnologyIcon from "@mui/icons-material/Devices";
import HealthIcon from "@mui/icons-material/HealingOutlined";
import HistoryIcon from "@mui/icons-material/History";
import MoviesIcon from "@mui/icons-material/MovieCreation";
import MusicIcon from "@mui/icons-material/MusicNoteOutlined";
import NewsIcon from "@mui/icons-material/Public";
import EducationIcon from "@mui/icons-material/SchoolOutlined";
import ComedyIcon from "@mui/icons-material/SentimentVerySatisfied";
import GamingIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsIcon from "@mui/icons-material/SportsSoccer";

// @ts-expect-error TS(6142): Module './TopicCard' was resolved to '/mnt/s/Githu... Remove this comment to see the full error message
import TopicCard from "./TopicCard";

type Props = {
    onTopicClicked: (...args: any[]) => any;
};

function TopicsGrid({ onTopicClicked = (e, topic) => { } }: Props) {
  const suggestions = [
    { title: "Books", icon: BooksIcon, color: "#00b0ff" },
    { title: "Business", icon: BusinessIcon, color: "#880e4f" },
    { title: "Comedy", icon: ComedyIcon, color: "#ffa000" },
    { title: "Education", icon: EducationIcon, color: "#424242" },
    { title: "Gaming", icon: GamingIcon, color: "#ba68c8" },
    { title: "Health", icon: HealthIcon, color: "#43a047" },
    { title: "History", icon: HistoryIcon, color: "#8d6e63" },
    { title: "Movies", icon: MoviesIcon, color: "#ff6f00" },
    { title: "Music", icon: MusicIcon, color: "#e040fb" },
    { title: "News", icon: NewsIcon, color: "#2e7d32" },
    { title: "Sports", icon: SportsIcon, color: "#0288d1" },
    { title: "Technology", icon: TechnologyIcon, color: "#7e57c2" },
  ];

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.Fragment>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Typography variant="h5" component="h5">
        Topics
      </Typography>

      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Box mt={4} mb={8}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Grid container justifyContent="center" spacing={2}>
          {suggestions.map((value) => {
            const TopicIcon = value.icon;

            return (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Grid key={value.title} item xs={12} sm={6} md={4} lg={3}>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <TopicCard
                  title={value.title}
                  // @ts-expect-error TS(2322): Type '{ title: string; color: { title: string; ico... Remove this comment to see the full error message
                  color={value}
                  icon={
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <TopicIcon
                      style={{
                        color: value.color,
                      }}
                    />
                  }
                  onClick={onTopicClicked}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default TopicsGrid;
