import { Component } from "react";

function withDialog(WrappedComponent) {
  return class WithDialog extends Component {
    state = {
      dialog: {
        open: false,
        error: false,
        errorMessage: "",
      },
    };

    handleDialogOpenChange = (open) => () => {
      this.setState({
        dialog: {
          error: false,
          open,
          errorMessage: "",
        },
      });
    };

    handleDialogError = (err) => {
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
