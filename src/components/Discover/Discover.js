import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RssFeedIcon from "@mui/icons-material/RssFeed";

import FeedFormDialog from "@/components/Discover/FeedFormDialog";
import NavBar from "@/components/NavBar/NavBar";
import Popular from "@/components/Discover/Popular";
import SearchContainer from "@/components/Discover/SearchContainer";
import TopicsGrid from "@/components/Discover/TopicsGrid";

import withDialog from "@/hoc/withDialog";
import discoverService from "@/services/discoverService";
import Routes from "@/utils/routes";

class Discover extends Component {
  state = {
    newFeed: "",
    searchTerm: "",
    searchResults: [],
    noResultsFound: false,
  };

  constructor(props) {
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

  componentDidUpdate(prevProps) {
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

        <NavBar title="Discover" showMoreMenu>
          <Tooltip title="Add an RSS Feed">
            <IconButton edge="start" color="inherit" size="large" onClick={this.props.onDialogOpen}>
              <RssFeedIcon />
            </IconButton>
          </Tooltip>
        </NavBar>

        <Container component="main" maxWidth="lg">
          <Box component="section" my={6}>
            <SearchContainer
              searchTerm={this.state.searchTerm}
              searchResults={this.state.searchResults}
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

          <FeedFormDialog
            {...this.props.dialog}
            onDialogClose={this.props.onDialogClose}
            onFormChange={this.handleFormChange}
            onSubscribe={this.handleSubscribeFromFeed}
          />
        </Container>
      </React.Fragment>
    );
  }

  handleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSearch = async (e, value) => {
    e.preventDefault();

    if (value) {
      this.setState({ searchTerm: value }, this.search);
    } else {
      this.search();
    }

    this.topRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Post the RSS feed entered in the dialog box to the server.
  handleSubscribeFromFeed = async () => {
    const { onDialogClose, onDialogError } = this.props;

    try {
      await discoverService.subscribeFromFeed(this.state.newFeed);
      onDialogClose();
    } catch (err) {
      onDialogError(err);
    }
  };

  search = async () => {
    if (!this.state.searchTerm) return;

    try {
      const results = await discoverService.search(this.state.searchTerm);

      this.setState({
        searchResults: results.filter((item) => !!item.feedUrl),
        noResultsFound: false,
      });
    } catch (err) {
      this.setState({
        noResultsFound: true,
      });
    } finally {
      this.props.history.replace(
        `${Routes.discover}?term=${encodeURIComponent(this.state.searchTerm)}`
      );
    }
  };
}

export default withRouter(withDialog(Discover));
