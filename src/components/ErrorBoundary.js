import React, { Component } from "react";

import axios from "@/config/axios";

import EmptyState, { EmptyStates } from "./EmptyState";

class ErrorBoundary extends Component {
  state = {
    error: null,
    errorStatus: 0,
  };

  componentDidCatch(error) {
    this.setState({ error });
  }

  componentDidMount() {
    this.requestInterceptor = axios.interceptors.request.use((req) => {
      if (this.state.error) {
        this.setState({ error: null, errorStatus: 0 });
      }
      return req;
    });

    this.responseInterceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        this.setState({ error, errorStatus: error?.response?.status });
        return Promise.reject(error);
      }
    );
  }

  componentWillUnmount() {
    axios.interceptors.request.eject(this.requestInterceptor);
    axios.interceptors.response.eject(this.responseInterceptor);
  }

  handleTryAgain() {
    window.location.reload();
  }

  render() {
    if (this.state.errorStatus) {
      if (this.state.errorStatus === 429) {
        return (
          <EmptyState
            emptyState={EmptyStates.CRASH}
            fullPage={true}
            title="Too Many Requests!"
            subtitle="Please wait a while and try again."
            cta="Try Again"
            onClick={this.handleTryAgain}
          />
        );
      }
      return this.props.children;
    }

    if (this.state.error) {
      return (
        <EmptyState
          emptyState={EmptyStates.BUGS}
          fullPage={true}
          title="An Unknown Error Occurred."
          subtitle="Sorry about that. Please refresh the page and try again."
          cta="Try Again"
          onClick={this.handleTryAgain}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
