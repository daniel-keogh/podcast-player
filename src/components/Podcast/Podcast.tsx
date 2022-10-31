import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import Container from "@mui/material/Container";
import NavBar from "@/components/NavBar/NavBar";
import PaginatedList from "./PaginatedList";
import EpisodeListItem from "./EpisodeListItem";
import PodcastInfo from "./PodcastInfo";

import withSnackbar, { WithSnackbarProps } from "@/hoc/withSnackbar";
import historyService from "@/services/historyService";
import subscriptionsService from "@/services/subscriptionsService";
import { isEmpty } from "@/utils";
import Routes from "@/utils/routes";
import type { Podcast as _Podcast } from "@/types/api/podcast";

const STARTING_ITEMS_PER_PAGE = 50;
const ITEMS_PER_PAGE = 100;

export interface PodcastProps extends WithSnackbarProps, RouteComponentProps {
  match: RouteComponentProps["match"] & {
    params: {
      id: string;
    };
  };
}

type PodcastState = {
  podcast: _Podcast;
  numEpisodes: number;
  isLoading: boolean;
};

class Podcast extends Component<PodcastProps, PodcastState> {
  state = {
    history: [],
    podcast: {} as _Podcast,
    numEpisodes: STARTING_ITEMS_PER_PAGE,
    isLoading: true,
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.history.location.search);
    let limit = Number(params.get("limit"));

    if (!limit || limit <= 0) {
      limit = this.state.numEpisodes;
    }

    const id = this.props.match.params.id;

    Promise.all([
      subscriptionsService.getSubscriptionById(id, limit),
      historyService.getHistoryByPodcastId(id),
    ])
      .then(([podcast, history]) => {
        const historyMap = history.reduce((prev, current) => {
          prev[current.episode.guid] = current;
          delete current.episode;
          return prev;
        }, {});

        this.setState({
          podcast,
          history: historyMap,
          numEpisodes: limit,
        });
      })
      .catch(this.props.onSnackbarOpen)
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  componentDidUpdate(prevProps: PodcastProps) {
    const params = new URLSearchParams(this.props.location.search);
    const limit = params.get("limit");

    const prevParams = new URLSearchParams(prevProps.location.search);
    const prevLimit = prevParams.get("limit");

    if (limit && limit !== prevLimit) {
      this.setState({ numEpisodes: +limit }, () => this.fetchMore(+limit));
    }
  }

  render() {
    const { history, podcast, isLoading, numEpisodes } = this.state;

    // If the title was passed as a prop use that, otherwise wait until `componentDidMount()` updates the state.
    const navTitle = (this.props.location.state as any)?.title || podcast.title;

    return (
      <React.Fragment>
        <NavBar title={navTitle} isLoading={isLoading} showMoreMenu />

        {/* Only display the PodcastInfo if `podcast` is not an empty object. */}
        {!isEmpty(podcast) ? (
          <Container maxWidth="lg">
            <PodcastInfo {...podcast} onSubscribe={this.handleSubscribe} />
            <PaginatedList numItems={numEpisodes} onShowMore={this.handleShowMoreClicked}>
              {podcast.episodes?.map((episode, i) => {
                return (
                  <EpisodeListItem
                    key={i}
                    podcastId={podcast._id}
                    podcastTitle={podcast.title}
                    artwork={podcast.artwork}
                    episode={episode}
                    date={episode.date}
                    isCompleted={history[episode.guid]?.isCompleted}
                    isFavourited={history[episode.guid]?.isFavourited}
                  />
                );
              })}
            </PaginatedList>
          </Container>
        ) : null}
      </React.Fragment>
    );
  }

  fetchMore = async (limit: number) => {
    try {
      const { episodes } = await subscriptionsService.getSubscriptionById(
        this.props.match.params.id,
        limit
      );

      this.setState((state) => ({
        podcast: {
          ...state.podcast,
          episodes,
        },
        numEpisodes: limit,
      }));
    } catch (err) {
      this.props.onSnackbarOpen(err as Error);
    } finally {
      // if (window.location.hash !== `#${Routes.rateLimit}`) {
      this.props.history.replace(`${Routes.podcast}/${this.state.podcast._id}?limit=${limit}`);
      // }
    }
  };

  // Display another 100 episodes whenever the "Show More" button is clicked
  handleShowMoreClicked = () => {
    const params = new URLSearchParams(this.props.history.location.search);
    const limit = (+(params.get("limit") as string) || this.state.numEpisodes) + ITEMS_PER_PAGE;
    this.fetchMore(limit);
  };

  handleSubscribe = async () => {
    try {
      if (this.state.podcast.isSubscribed) {
        await subscriptionsService.removeSubscription(this.state.podcast._id);

        this.setState((state) => ({
          podcast: {
            ...state.podcast,
            isSubscribed: false,
            subscriberCount: state.podcast.subscriberCount - 1,
          },
        }));
      } else {
        // Re-subscribe
        const result = await subscriptionsService.addSubscription(this.state.podcast.feedUrl);

        this.setState((state) => ({
          podcast: {
            ...state.podcast,
            ...result,
            isSubscribed: true,
          },
        }));
      }
    } catch (err) {
      this.props.onSnackbarOpen(err as Error);
    }
  };
}

export default withRouter(withSnackbar(Podcast));
