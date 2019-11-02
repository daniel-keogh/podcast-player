import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));

const AddNew = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Fab color="secondary" className={classes.fab}>
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
}

export default AddNew;