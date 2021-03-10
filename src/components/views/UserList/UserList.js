import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './UserList.module.scss';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const UserList = ({ className }) => (
  <div className={clsx(className, styles.root)}>
    <Paper className={styles.paper}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={styles.title}
      >
        <Grid item xs={2}>
          <p>User List</p>
        </Grid>
        <Grid item xs={2} className={styles.addNew}>
          <Button variant="contained" color="primary">
            Add new
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="center"
        className={styles.table}
      >
        <Grid item xs>Id</Grid>
        <Grid item xs>Name</Grid>
        <Grid item xs>Username</Grid>
        <Grid item xs>Email</Grid>
        <Grid item xs>City</Grid>
        <Grid item xs>Edit</Grid>
        <Grid item xs>Delete</Grid>
      </Grid>
    </Paper>
  </div>
);

UserList.propTypes = {
  className: PropTypes.string,
};

export default UserList;
