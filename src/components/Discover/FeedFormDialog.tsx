import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export type FeedFormDialogProps = {
  open?: boolean;
  error?: boolean;
  errorMessage?: string;
  onDialogClose: () => void;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubscribe: () => void;
};

function FeedFormDialog({
  open = false,
  error = false,
  errorMessage = "",
  onDialogClose,
  onFormChange,
  onSubscribe,
}: FeedFormDialogProps) {
  return (
    <Dialog fullWidth open={open} onClose={onDialogClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter the link to the RSS feed.</DialogContentText>
        <Box mt={2}>
          <form onSubmit={onSubscribe}>
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
      <DialogActions>
        <Button onClick={onDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubscribe} color="primary" type="submit">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FeedFormDialog;
