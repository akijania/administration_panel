import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import { connect } from 'react-redux';
// import { getAllUsers, fetchPublishedUsers } from '../../../redux/usersRedux';
import styles from './RemoveModal.module.scss';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import orange from 'material-ui/colors/orange';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  },
}))(Button);

class Component extends React.Component {
  render() {
    const { className, id } = this.props;

    return (
      <div className={clsx(className, styles.root)}>
        <div className={styles.overlay} id="overlay">
          <div className={styles.modal} id="myModal">
            <h3>Delete</h3>
            <div className={styles.modalContent}>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </div>
            <div className={styles.buttons}>
              <Button variant="contained" className={styles.buttonCancel}>
                <p className={styles.btn}>cancel</p>
              </Button>
              <Button variant="contained" color="secondary">
                <p className={styles.btn}>delete</p>
              </Button>
            </div>
          </div>
        </div>
        <ColorButton variant="contained" color="primary">
          <p className={styles.btn}>edit</p>
        </ColorButton>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

// const mapStateToProps = (state) => ({
//   users: getAllUsers(state),
// });

// const mapDispatchToProps = (dispatch) => ({
//   fetchPublishedUsers: () => dispatch(fetchPublishedUsers()),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export { Component as RemoveModal, Component as RemoveModalComponent };
