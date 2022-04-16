import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Container from "@mui/material/Container";
import NavBar from "@/components/NavBar/NavBar";
import PaginatedList from "./PaginatedList";
import EpisodeListItem from "./EpisodeListItem";
import PodcastInfo from "./PodcastInfo";

import withSnackbar from "@/hoc/withSnackbar";
import subscriptionsService from "@/services/subscriptionsService";
import { isEmpty } from "@/utils";
import Routes from "@/utils/routes";

const STARTING_ITEMS_PER_PAGE = 50;
const ITEMS_PER_PAGE = 100;

class Podcast extends Component {
  state = {
    podcast: {},
    numEpisodes: STARTING_ITEMS_PER_PAGE,
    isLoading: true,
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.history.location.search);
    let limit = Number(params.get("limit"));

    if (!limit || limit <= 0) {
      limit = this.state.numEpisodes;
    }

    subscriptionsService
      .getSubscriptionById(this.props.match.params.id, limit)
      .then((podcast) => {
        this.setState({
          podcast,
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

  componentDidUpdate(prevProps) {
    const params = new URLSearchParams(this.props.location.search);
    const limit = +params.get("limit");

    const prevParams = new URLSearchParams(prevProps.location.search);
    const prevLimit = +prevParams.get("limit");

    if (limit && limit !== prevLimit) {
      this.setState({ numEpisodes: limit }, () => this.fetchMore(limit));
    }
  }

  render() {
    const { podcast, isLoading, numEpisodes } = this.state;

    // If the title was passed as a prop use that, otherwise wait until `componentDidMount()` updates the state.
    const navTitle = this.props.location.state?.title || podcast.title;

    return (
      <React.Fragment>
        <NavBar title={navTitle} isLoading={isLoading} />

        {/* Only display the PodcastInfo if `
        podcast` is not an empty object. */}
        {!isEmpty(podcast) ? (
          <Container maxWidth="lg">
            <PodcastInfo {...podcast} onSubscribe={this.handleSubscribe} />
            <PaginatedList numItems={numEpisodes} onShowMore={this.handleShowMoreClicked}>
              {podcast.episodes?.map((episode, i) => (
                <EpisodeListItem
                  key={i}
                  episode={episode}
                  id={podcast._id}
                  podcastTitle={podcast.title}
                  artwork={podcast.artwork}
                />
              ))}
            </PaginatedList>
          </Container>
        ) : null}
      </React.Fragment>
    );
  }

  fetchMore = async (limit) => {
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
      this.props.onSnackbarOpen(err);
    } finally {
      if (window.location.hash !== `#${Routes.rateLimit}`) {
        this.props.history.replace(`${Routes.podcast}/${this.state.podcast._id}?limit=${limit}`);
      }
    }
  };

  // Display another 100 episodes whenever the "Show More" button is clicked
  handleShowMoreClicked = () => {
    const params = new URLSearchParams(this.props.history.location.search);
    const limit = (+params.get("limit") || this.state.numEpisodes) + ITEMS_PER_PAGE;
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
      this.props.onSnackbarOpen(err);
    }
  };
}

export default withRouter(withSnackbar(Podcast));
