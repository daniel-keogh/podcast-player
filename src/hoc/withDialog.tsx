import React, { Component } from "react";

export type WithDialogProps = {
  dialog: {
    open: boolean;
    error: boolean;
    errorMessage: string;
  };
  onDialogOpen: () => void;
  onDialogClose: () => void;
  onDialogError: (err: Error) => void;
};

function withDialog<T extends WithDialogProps = WithDialogProps>(
  WrappedComponent: React.ComponentType<any>
): React.ComponentType<any> {
  return class WithDialog extends Component<Omit<T, keyof WithDialogProps>> {
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
