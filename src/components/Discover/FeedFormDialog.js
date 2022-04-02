import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

function FeedFormDialog(props) {
  return (
    <Dialog fullWidth open={props.open} onClose={props.onDialogClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter the link to the RSS feed.</DialogContentText>
        <form onSubmit={props.onSubscribe}>
          <TextField
            autoFocus
            fullWidth
            label="Feed URL"
            margin="dense"
            name="newFeed"
            type="url"
            error={props.error}
            helperText={props.errorMessage}
            onChange={props.onFormChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.onSubscribe} color="primary" type="submit">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FeedFormDialog;
