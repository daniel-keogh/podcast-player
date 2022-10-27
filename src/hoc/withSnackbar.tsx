import React, { Component } from "react";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

type SnackbarState = {
  onSnackbarOpen: (message: string, error?: boolean) => void;
  onSnackbarClose: () => void;
};

function withSnackbar(WrappedComponent: React.ComponentType<SnackbarState>) {
  return class WithSnackbar extends Component {
    state = {
      snackbar: {
        open: false,
        message: "",
      },
    };

    handleSnackbarOpen = (message: string, error = true) => {
      this.setState({
        snackbar: {
          open: true,
          message: error ? `Error: ${message}` : message,
        },
      });
    };

    handleSnackbarClose = () => {
      this.setState({
        snackbar: {
          open: false,
          message: "",
        },
      });
    };

    render() {
      return (
        <React.Fragment>
          <WrappedComponent
            onSnackbarOpen={this.handleSnackbarOpen}
            onSnackbarClose={this.handleSnackbarClose}
            {...this.props}
          />
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={this.state.snackbar.open}
            message={this.state.snackbar.message}
            onClose={this.handleSnackbarClose}
            action={
              <Button color="secondary" size="small" onClick={this.handleSnackbarClose}>
                OK
              </Button>
            }
          />
        </React.Fragment>
      );
    }
  };
}

export default withSnackbar;
