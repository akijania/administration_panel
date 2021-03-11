import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import styles from './EditUser.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserById, fetchPublishedUsers, editUserRequest } from '../../../redux/usersRedux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import green from 'material-ui/colors/green';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

class Component extends React.Component {
  state = {
    name: '',
    username: '',
    email: '',
    city: '',
    redirect: false,
  };
  async componentDidMount() {
    const { fetchPublishedUsers, user } = this.props;
    fetchPublishedUsers();
    if (user) {
      this.setState({
        name: user.name,
        email: user.email,
        redirect: false,
      });

      if (user.username) {
        this.setState({
          username: user.username,
        });
      }
      if (user.address && user.address.city) {
        this.setState({
          city: user.address.city,
        });
      }
    }
  }

  handleChangeName(event) {
    this.setState({
      name: event.target.value,
    });
  }
  handleChangeUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }
  handleChangeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }
  handleChangeCity(event) {
    this.setState({
      city: event.target.value,
    });
  }
  submitForm(event) {
    const { name, username, email, city } = this.state;
    const { editUserRequest, user } = this.props;
    event.preventDefault();
    const data = {
      id: user.id,
      name: name,
      username: username,
      email: email,
      address: {
        city: city,
      },
    };
    if (data.id && data.name && data.email) {
      editUserRequest(data);
      this.setState({
        name: '',
        username: '',
        email: '',
        city: '',
        redirect: true,
      });
    } else {
      prompt('Name and email can not be empty');
    }
  }
  render() {
    const { className } = this.props;
    const { name, username, email, city } = this.state;
    if (this.state.redirect) return <Redirect to="/" />;
    else
      return (
        <div className={clsx(className, styles.root)}>
          <Paper>
            <div className={styles.title}>
              <p>Form</p>
            </div>
            <div>
              <form onSubmit={(event) => this.submitForm(event)}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  className={styles.form}
                >
                  <Grid item xs={5}>
                    Name
                  </Grid>
                  <Grid item xs={7}>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      onChange={(event) => this.handleChangeName(event)}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  className={styles.form}
                >
                  <Grid item xs={5}>
                    Username
                  </Grid>
                  <Grid item xs={7}>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={(event) => this.handleChangeUsername(event)}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  className={styles.form}
                >
                  <Grid item xs={5}>
                    Email
                  </Grid>
                  <Grid item xs={7}>
                    <input
                      type="email"
                      name="email"
                      required
                      value={email}
                      onChange={(event) => this.handleChangeEmail(event)}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  className={styles.form}
                >
                  <Grid item xs={5}>
                    City
                  </Grid>
                  <Grid item xs={7}>
                    <input
                      type="text"
                      name="city"
                      value={city}
                      onChange={(event) => this.handleChangeCity(event)}
                    />
                  </Grid>
                </Grid>

                <div className={styles.buttons}>
                  <Link to="/">
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={styles.btn_cancel}
                    >
                      <p className={styles.btn}>Cancel</p>
                    </Button>
                  </Link>
                  <ColorButton
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    <p className={`${styles.btn} ${styles.btnSubmit}`}>
                      Submit
                    </p>
                  </ColorButton>
                </div>
              </form>
            </div>
          </Paper>
        </div>
      );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  addUserRequest: PropTypes.func,
  user: PropTypes.object,
  fetchPublishedUsers: PropTypes.func,
  editUserRequest: PropTypes.func,
};

const mapStateToProps = (state, props) => {
  const user = getUserById(state, props.match.params.id);
  return {
    user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchPublishedUsers: () => dispatch(fetchPublishedUsers()),
  editUserRequest: (data) => dispatch(editUserRequest(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export { Container as EditUser, Component as UserPageComponent };
