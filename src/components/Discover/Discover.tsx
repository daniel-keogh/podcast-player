import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RssFeedIcon from "@mui/icons-material/RssFeed";

import NavBar from "@/components/NavBar/NavBar";
import Popular from "@/components/Discover/Popular";
import SearchContainer from "@/components/Discover/SearchContainer";
import TopicsGrid from "@/components/Discover/TopicsGrid";
import { LazyComponent } from "@/components/LazyComponent";

import withDialog, { WithDialogProps } from "@/hoc/withDialog";
import discoverService from "@/services/discoverService";
import Routes from "@/utils/routes";
import type { SearchResult } from "@/types/api/discover";

export interface DiscoverProps extends WithDialogProps, RouteComponentProps {}

type DiscoverState = {
  newFeed: string;
  noResultsFound: boolean;
  searchTerm: string;
  searchResults: Array<SearchResult>;
};

class Discover extends Component<DiscoverProps, DiscoverState> {
  private topRef: React.RefObject<HTMLDivElement>;

  state: DiscoverState = {
    newFeed: "",
    noResultsFound: false,
    searchTerm: "",
    searchResults: [],
  };

  constructor(props: DiscoverProps) {
    super(props);
    this.topRef = React.createRef();
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.history.location.search);
    const term = params.get("term");

    if (term) {
      this.setState({ searchTerm: term }, this.search);
    }
  }

  componentDidUpdate(prevProps: DiscoverProps) {
    const params = new URLSearchParams(this.props.location.search);
    const term = params.get("term");

    const prevParams = new URLSearchParams(prevProps.location.search);
    const prevTerm = prevParams.get("term");

    if (term && term !== prevTerm) {
      this.setState({ searchTerm: term }, this.search);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="top" ref={this.topRef}></div>

        <NavBar title="Discover">
          <Tooltip title="Add an RSS Feed">
            <IconButton edge="end" color="inherit" size="large" onClick={this.props.onDialogOpen}>
              <RssFeedIcon />
            </IconButton>
          </Tooltip>
        </NavBar>

        <Container component="main" maxWidth="lg">
          <Box component="section" my={6}>
            <SearchContainer
              searchTerm={this.state.searchTerm}
              searchResults={this.state.searchResults.filter((item) => !!item.feedUrl)}
              noResultsFound={this.state.noResultsFound}
              onChange={this.handleFormChange}
              onSearch={this.handleSearch}
            />
          </Box>

          <Box component="section" my={6}>
            <Popular />
          </Box>

          <Box component="section" my={6} pb={2}>
            <TopicsGrid onTopicClicked={this.handleSearch} />
          </Box>
        </Container>

        {this.props.dialog.open && (
          <LazyComponent>
            {({ FeedFormDialog }) => (
              <FeedFormDialog
                {...this.props.dialog}
                onDialogClose={this.props.onDialogClose}
                onFormChange={this.handleFormChange}
                onSubscribe={this.handleSubscribeFromFeed}
              />
            )}
          </LazyComponent>
        )}
      </React.Fragment>
    );
  }

  handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]: event.target.value,
    } as any);
  };

  handleSearch = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, value?: string) => {
    e.preventDefault();

    if (value) {
      this.setState({ searchTerm: value }, this.search);
    } else {
      this.search();
    }

    this.topRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Post the RSS feed entered in the dialog box to the server.
  handleSubscribeFromFeed = async () => {
    try {
      await discoverService.subscribeFromFeed(this.state.newFeed);
      this.props.onDialogClose();
    } catch (err) {
      this.props.onDialogError(err as Error);
    }
  };

  search = async () => {
    if (!this.state.searchTerm) return;

    try {
      const results = await discoverService.search(this.state.searchTerm);

      this.setState({
        searchResults: results,
        noResultsFound: false,
      });
    } catch (err) {
      this.setState({
        noResultsFound: true,
      });
    } finally {
      if (window.location.hash !== `#${Routes.rateLimit}`) {
        this.props.history.replace(
          `${Routes.discover}?term=${encodeURIComponent(this.state.searchTerm)}`
        );
      }
    }
  };
}

export default withRouter(withDialog(Discover));
