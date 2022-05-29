import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import List from "@mui/material/List";

import NavBar from "@/components/NavBar/NavBar";
import EpisodeListItem from "@/components/Podcast/EpisodeListItem";
import EmptyState, { EmptyStates } from "@/components/EmptyState";
import ConfirmClearHistoryDialog from "./ConfirmClearHistoryDialog";
import historyService from "@/services/historyService";
import withDialog from "@/hoc/withDialog";
import Routes from "@/utils/routes";

function History({ dialog, onDialogOpen, onDialogClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [historyItems, setHistoryItems] = useState([]);
  const [mappedHistory, setMappedHistory] = useState({});

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await historyService.getHistory();
        setHistoryItems(data);
        setMappedHistory(
          data.reduce((prev, current) => {
            prev[current.episode.guid] = current;
            return prev;
          }, {})
        );
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleClearHistory = async () => {
    const res = await historyService.clearHistory();
    if (res.status === 204) {
      setHistoryItems([]);
    }
    onDialogClose();
  };

  return (
    <React.Fragment>
      <NavBar title="History" />

      <Container maxWidth="lg">
        {historyItems.length > 0 ? (
          <React.Fragment>
            <Box display="flex" justifyContent="end" marginTop={6} marginBottom={3}>
              <Button onClick={onDialogOpen}>Clear history</Button>
            </Box>

            <List>
              {historyItems.map((item, i) => {
                return (
                  <EpisodeListItem
                    key={i}
                    date={item.updatedAt}
                    episode={item.episode}
                    podcastId={item.episode.podcast._id}
                    podcastTitle={item.episode.podcast.title}
                    artwork={item.episode.podcast.artwork}
                    isCompleted={mappedHistory[item.episode.guid]?.isCompleted}
                    isFavourited={mappedHistory[item.episode.guid]?.isFavourited}
                    isPlaylistItem={true}
                  />
                );
              })}
            </List>
          </React.Fragment>
        ) : !isLoading ? (
          <EmptyState
            emptyState={EmptyStates.LISTENING}
            title="You have no history yet"
            subtitle="Start listening and episodes will begin to appear here."
            cta="View Subscriptions"
            to={Routes.subscriptions}
          />
        ) : null}
      </Container>

      <ConfirmClearHistoryDialog
        {...dialog}
        onCancel={onDialogClose}
        onConfirm={handleClearHistory}
      />
    </React.Fragment>
  );
}

export default withDialog(History);
