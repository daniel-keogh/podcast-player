import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

type Props = {
    open?: boolean;
    error?: boolean;
    errorMessage?: string;
    onDialogClose: (...args: any[]) => any;
    onFormChange: (...args: any[]) => any;
    onSubscribe: (...args: any[]) => any;
};

function FeedFormDialog({ open = false, error = false, errorMessage = "", onDialogClose, onFormChange, onSubscribe, }: Props) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Dialog fullWidth open={open} onClose={onDialogClose}>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <DialogTitle>Subscribe</DialogTitle>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <DialogContent>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <DialogContentText>Enter the link to the RSS feed.</DialogContentText>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Box mt={2}>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <form onSubmit={onSubscribe}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <TextField
              autoFocus
              fullWidth
              label="Feed URL"
              margin="dense"
              name="newFeed"
              type="url"
              error={error}
              helperText={errorMessage}
              onChange={onFormChange}
            />
          </form>
        </Box>
      </DialogContent>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <DialogActions>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button onClick={onDialogClose} color="primary">
          Cancel
        </Button>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button onClick={onSubscribe} color="primary" type="submit">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FeedFormDialog;
