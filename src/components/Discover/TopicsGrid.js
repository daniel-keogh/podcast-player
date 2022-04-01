import React from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import BooksIcon from "@material-ui/icons/BookOutlined";
import BusinessIcon from "@material-ui/icons/Business";
import TechnologyIcon from "@material-ui/icons/Devices";
import HealthIcon from "@material-ui/icons/HealingOutlined";
import HistoryIcon from "@material-ui/icons/History";
import MoviesIcon from "@material-ui/icons/MovieCreation";
import MusicIcon from "@material-ui/icons/MusicNoteOutlined";
import NewsIcon from "@material-ui/icons/Public";
import EducationIcon from "@material-ui/icons/SchoolOutlined";
import ComedyIcon from "@material-ui/icons/SentimentVerySatisfied";
import GamingIcon from "@material-ui/icons/SportsEsportsOutlined";
import SportsIcon from "@material-ui/icons/SportsSoccer";

import TopicCard from "./TopicCard";

function TopicsGrid({ onTopicClicked = (e, topic) => {}, ...props }) {
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
    <React.Fragment>
      <Typography variant="h5" component="h5">
        Topics
      </Typography>

      <Box mt={4} mb={8}>
        <Grid container justifyContent="center" spacing={2}>
          {suggestions.map((value) => {
            const TopicIcon = value.icon;

            return (
              <Grid key={value.title} item xs={12} sm={6} md={4} lg={3}>
                <TopicCard
                  title={value.title}
                  color={value}
                  icon={
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
