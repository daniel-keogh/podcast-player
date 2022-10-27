import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Container from "@mui/material/Container";
// @ts-expect-error TS(2307): Cannot find module '@/components/NavBar/NavBar' or... Remove this comment to see the full error message
import NavBar from "@/components/NavBar/NavBar";
// @ts-expect-error TS(6142): Module './PaginatedList' was resolved to '/mnt/s/G... Remove this comment to see the full error message
import PaginatedList from "./PaginatedList";
// @ts-expect-error TS(6142): Module './EpisodeListItem' was resolved to '/mnt/s... Remove this comment to see the full error message
import EpisodeListItem from "./EpisodeListItem";
// @ts-expect-error TS(6142): Module './PodcastInfo' was resolved to '/mnt/s/Git... Remove this comment to see the full error message
import PodcastInfo from "./PodcastInfo";

// @ts-expect-error TS(2307): Cannot find module '@/hoc/withSnackbar' or its cor... Remove this comment to see the full error message
import withSnackbar from "@/hoc/withSnackbar";
// @ts-expect-error TS(2307): Cannot find module '@/services/subscriptionsServic... Remove this comment to see the full error message
import subscriptionsService from "@/services/subscriptionsService";
// @ts-expect-error TS(2307): Cannot find module '@/utils' or its corresponding ... Remove this comment to see the full error message
import { isEmpty } from "@/utils";
// @ts-expect-error TS(2307): Cannot find module '@/utils/routes' or its corresp... Remove this comment to see the full error message
import Routes from "@/utils/routes";

const STARTING_ITEMS_PER_PAGE = 50;
const ITEMS_PER_PAGE = 100;

type State = any;

class Podcast extends Component<{}, State> {
  state = {
    podcast: {},
    numEpisodes: STARTING_ITEMS_PER_PAGE,
    isLoading: true,
  };

  componentDidMount() {
    const params = new URLSearchParams((this.props as any).history.location.search);
    let limit = Number(params.get("limit"));

    if (!limit || limit <= 0) {
      limit = this.state.numEpisodes;
    }

    subscriptionsService
    .getSubscriptionById((this.props as any).match.params.id, limit)
    .then((podcast: any) => {
    this.setState({
        podcast,
        numEpisodes: limit,
    });
})
    .catch((this.props as any).onSnackbarOpen)
    .finally(() => {
    this.setState({
        isLoading: false,
    });
});
  }

  componentDidUpdate(prevProps: {}) {
    const params = new URLSearchParams((this.props as any).location.search);
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    const limit = +params.get("limit");

    const prevParams = new URLSearchParams((prevProps as any).location.search);
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    const prevLimit = +prevParams.get("limit");

    if (limit && limit !== prevLimit) {
      this.setState({ numEpisodes: limit }, () => this.fetchMore(limit));
    }
  }

  render() {
    const { podcast, isLoading, numEpisodes } = this.state;

    // If the title was passed as a prop use that, otherwise wait until `componentDidMount()` updates the state.
const navTitle = (this.props as any).location.state?.title || (podcast as any).title;

    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<React.Fragment>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <NavBar title={navTitle} isLoading={isLoading}/>

        {/* Only display the PodcastInfo if `
    podcast` is not an empty object. */}
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {!isEmpty(podcast) ? (<Container maxWidth="lg">
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <PodcastInfo {...podcast} onSubscribe={this.handleSubscribe}/>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <PaginatedList numItems={numEpisodes} onShowMore={this.handleShowMoreClicked}>
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {(podcast as any).episodes?.map((episode: any, i: any) => (<EpisodeListItem key={i} episode={episode} id={(podcast as any)._id} podcastTitle={(podcast as any).title} artwork={(podcast as any).artwork}/>))}
            </PaginatedList>
          </Container>) : null}
      </React.Fragment>);
  }

  fetchMore = async (limit: any) => {
    try {
      const { episodes } = await subscriptionsService.getSubscriptionById((this.props as any).match.params.id, limit);

      this.setState((state: any) => ({
        podcast: {
          ...state.podcast,
          episodes,
        },

        numEpisodes: limit
      }));
    } catch (err) {
      (this.props as any).onSnackbarOpen(err);
    } finally {
      if (window.location.hash !== `#${Routes.rateLimit}`) {
        (this.props as any).history.replace(`${Routes.podcast}/${(this.state.podcast as any)._id}?limit=${limit}`);
      }
    }
  };

  // Display another 100 episodes whenever the "Show More" button is clicked
  handleShowMoreClicked = () => {
    const params = new URLSearchParams((this.props as any).history.location.search);
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    const limit = (+params.get("limit") || this.state.numEpisodes) + ITEMS_PER_PAGE;
    this.fetchMore(limit);
  };

  handleSubscribe = async () => {
    try {
      if ((this.state.podcast as any).isSubscribed) {
        await subscriptionsService.removeSubscription((this.state.podcast as any)._id);

        this.setState((state: any) => ({
          podcast: {
            ...state.podcast,
            isSubscribed: false,
            subscriberCount: state.podcast.subscriberCount - 1,
          }
        }));
      } else {
        // Re-subscribe
const result = await subscriptionsService.addSubscription((this.state.podcast as any).feedUrl);

        this.setState((state: any) => ({
          podcast: {
            ...state.podcast,
            ...result,
            isSubscribed: true,
          }
        }));
      }
    } catch (err) {
      (this.props as any).onSnackbarOpen(err);
    }
  };
}

export default withRouter(withSnackbar(Podcast));
