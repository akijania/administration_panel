import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { getAllUsers, fetchPublishedUsers } from '../../../redux/usersRedux';
import { Link } from 'react-router-dom';
import styles from './UserList.module.scss';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { RemoveModal } from '../../features/RemoveModal/RemoveModal';


class Component extends React.Component {
  componentDidMount() {
    const { fetchPublishedUsers } = this.props;
    fetchPublishedUsers();
  }
  render() {
    const { users, className } = this.props;

    return (
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
              <Link to="/form">
                <Button variant="contained" color="primary">
                  <p className={styles.btn}>add new</p>
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            className={styles.table}
          >
            <Grid item xs>
              Id
            </Grid>
            <Grid item xs>
              Name
            </Grid>
            <Grid item xs>
              Username
            </Grid>
            <Grid item xs>
              Email
            </Grid>
            <Grid item xs>
              City
            </Grid>
            <Grid item xs>
              Edit
            </Grid>
            <Grid item xs>
              Delete
            </Grid>
          </Grid>
          {users &&
            users.map((item) => (
              <Grid
                key={item.id}
                container
                direction="row"
                alignItems="center"
                className={styles.tableContent}
              >
                <Grid item xs>
                  {item.id}
                </Grid>
                <Grid item xs>
                  {item.name}
                </Grid>
                <Grid item xs>
                  {item.username}
                </Grid>
                <Grid item xs>
                  {item.email}
                </Grid>
                <Grid item xs>
                  {item.address && item.address.city}
                </Grid>
                <Grid item xs>
                  <RemoveModal id={item.id}/>
                </Grid>
                <Grid item xs>
                  <Button variant="contained" color="secondary">
                    <p className={styles.btn}>delete</p>
                  </Button>
                </Grid>
              </Grid>
            ))}
        </Paper>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array,
  fetchPublishedUsers: PropTypes.func,
};

const mapStateToProps = (state) => ({
  users: getAllUsers(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPublishedUsers: () => dispatch(fetchPublishedUsers()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export { Container as UserList, Component as UserListComponent };
