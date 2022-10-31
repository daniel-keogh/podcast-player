import React, { Component } from "react";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

export type WithSnackbarProps = {
  onSnackbarOpen: (message: string | Error, error?: boolean) => void;
  onSnackbarClose: () => void;
};

function withSnackbar<T extends WithSnackbarProps = WithSnackbarProps>(
  WrappedComponent: React.ComponentType<any>
): React.ComponentType<any> {
  return class WithSnackbar extends Component<Omit<T, keyof WithSnackbarProps>> {
    state = {
      snackbar: {
        open: false,
        message: "",
      },
    };

    handleSnackbarOpen = (message: string | Error, error = true) => {
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
