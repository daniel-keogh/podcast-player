import React, { Component } from "react";

type DialogState = {
  dialog: {
    open: boolean;
    error: boolean;
    errorMessage: string;
  };
  onDialogOpen: () => void;
  onDialogClose: () => void;
  onDialogError: (err: Error) => void;
};

function withDialog(WrappedComponent: React.ComponentType<DialogState>) {
  return class WithDialog extends Component {
    state = {
      dialog: {
        open: false,
        error: false,
        errorMessage: "",
      },
    };

    handleDialogOpenChange = (open: boolean) => () => {
      this.setState({
        dialog: {
          error: false,
          open,
          errorMessage: "",
        },
      });
    };

    handleDialogError = (err: Error) => {
      this.setState({
        dialog: {
          open: true,
          error: true,
          errorMessage: err.message,
        },
      });
    };

    render() {
      return (
        <WrappedComponent
          dialog={this.state.dialog}
          onDialogOpen={this.handleDialogOpenChange(true)}
          onDialogClose={this.handleDialogOpenChange(false)}
          onDialogError={this.handleDialogError}
          {...this.props}
        />
      );
    }
  };
}

export default withDialog;
