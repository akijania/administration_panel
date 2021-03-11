import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import styles from './AddUser.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUserRequest } from '../../../redux/usersRedux';
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
    email: '',
    redirect: false,
  };
  componentDidMount() {
    this.setState({
      name: '',
      email: '',
      redirect: false,
    });
  }
  handleChangeName(event) {
    this.setState({
      name: event.target.value,
    });
  }
  handleChangeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }
  submitForm(event) {
    const { name, email } = this.state;
    const { addUserRequest } = this.props;
    const user = {
      id: Math.floor(Math.random() * 10000),
      name: name,
      email: email,
    };
    event.preventDefault();
    if (user.id && user.name && user.email) {
      addUserRequest(user);
      this.setState({
        redirect: true,
      });
    } else {
      prompt('Name and email can not be empty');
    }
  }

  render() {
    const { className } = this.props;
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
                    Email
                  </Grid>
                  <Grid item xs={7}>
                    <input
                      type="email"
                      name="email"
                      required
                      onChange={(event) => this.handleChangeEmail(event)}
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
                  <ColorButton variant="contained" color="primary" type="submit">
                    <p className={`${styles.btn} ${styles.btnSubmit}`}>Submit</p>
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
};

const mapDispatchToProps = (dispatch) => ({
  addUserRequest: (user) => dispatch(addUserRequest(user)),
});
const Container = connect(null, mapDispatchToProps)(Component);

export { Container as AddUser, Component as AddUserComponent };
