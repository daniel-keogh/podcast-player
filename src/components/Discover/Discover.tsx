import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RssFeedIcon from "@mui/icons-material/RssFeed";

// @ts-expect-error TS(2307): Cannot find module '@/components/Discover/FeedForm... Remove this comment to see the full error message
import FeedFormDialog from "@/components/Discover/FeedFormDialog";
// @ts-expect-error TS(2307): Cannot find module '@/components/NavBar/NavBar' or... Remove this comment to see the full error message
import NavBar from "@/components/NavBar/NavBar";
// @ts-expect-error TS(2307): Cannot find module '@/components/Discover/Popular'... Remove this comment to see the full error message
import Popular from "@/components/Discover/Popular";
// @ts-expect-error TS(2307): Cannot find module '@/components/Discover/SearchCo... Remove this comment to see the full error message
import SearchContainer from "@/components/Discover/SearchContainer";
// @ts-expect-error TS(2307): Cannot find module '@/components/Discover/TopicsGr... Remove this comment to see the full error message
import TopicsGrid from "@/components/Discover/TopicsGrid";

// @ts-expect-error TS(2307): Cannot find module '@/hoc/withDialog' or its corre... Remove this comment to see the full error message
import withDialog from "@/hoc/withDialog";
// @ts-expect-error TS(2307): Cannot find module '@/services/discoverService' or... Remove this comment to see the full error message
import discoverService from "@/services/discoverService";
// @ts-expect-error TS(2307): Cannot find module '@/utils/routes' or its corresp... Remove this comment to see the full error message
import Routes from "@/utils/routes";

type State = any;

class Discover extends Component<{}, State> {
  state = {
    newFeed: "",
    noResultsFound: false,
    searchTerm: "",
    searchResults: [],
  };

  constructor(props: {}) {
    super(props);
    (this as any).topRef = React.createRef();
  }

  componentDidMount() {
    const params = new URLSearchParams((this.props as any).history.location.search);
    const term = params.get("term");

    if (term) {
      this.setState({ searchTerm: term }, this.search);
    }
  }

  componentDidUpdate(prevProps: {}) {
    const params = new URLSearchParams((this.props as any).location.search);
    const term = params.get("term");

    const prevParams = new URLSearchParams((prevProps as any).location.search);
    const prevTerm = prevParams.get("term");

    if (term && term !== prevTerm) {
      this.setState({ searchTerm: term }, this.search);
    }
  }

  render() {
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<React.Fragment>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div id="top" ref={(this as any).topRef}></div>

        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <NavBar title="Discover">
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Tooltip title="Add an RSS Feed">
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <IconButton edge="end" color="inherit" size="large" onClick={(this.props as any).onDialogOpen}>
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <RssFeedIcon />
            </IconButton>
          </Tooltip>
        </NavBar>

        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Container component="main" maxWidth="lg">
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Box component="section" my={6}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <SearchContainer searchTerm={this.state.searchTerm} searchResults={this.state.searchResults.filter((item) => !!(item as any).feedUrl)} noResultsFound={this.state.noResultsFound} onChange={this.handleFormChange} onSearch={this.handleSearch}/>
          </Box>

          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Box component="section" my={6}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Popular />
          </Box>

          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Box component="section" my={6} pb={2}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <TopicsGrid onTopicClicked={this.handleSearch}/>
          </Box>

          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <FeedFormDialog {...(this.props as any).dialog} onDialogOpen={(this.props as any).onDialogOpen} onDialogClose={(this.props as any).onDialogClose} onFormChange={this.handleFormChange} onSubscribe={this.handleSubscribeFromFeed}/>
        </Container>
      </React.Fragment>);
  }

  handleFormChange = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSearch = async (e: any, value: any) => {
    e.preventDefault();

    if (value) {
      this.setState({ searchTerm: value }, this.search);
    } else {
      this.search();
    }

    (this as any).topRef.current.scrollIntoView({
    behavior: "smooth",
});
  };

  // Post the RSS feed entered in the dialog box to the server.
  handleSubscribeFromFeed = async () => {
    try {
      await discoverService.subscribeFromFeed(this.state.newFeed);
      (this.props as any).onDialogClose();
    } catch (err) {
      (this.props as any).onDialogError(err);
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
        (this.props as any).history.replace(`${Routes.discover}?term=${encodeURIComponent(this.state.searchTerm)}`);
      }
    }
  };
}

export default withRouter(withDialog(Discover));
