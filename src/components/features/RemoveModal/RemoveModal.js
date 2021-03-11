import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import { connect } from 'react-redux';
// import { getAllUsers, fetchPublishedUsers } from '../../../redux/usersRedux';
import styles from './RemoveModal.module.scss';
import Button from '@material-ui/core/Button';


class Component extends React.Component {
  state = {
    openModal: false,
  };
  handleOpenModal = () => {
    this.setState({
      openModal: true,
    });
  };
  handleCloseModal = () => {
    this.setState({
      openModal: false,
    });
  };
  render() {
    const { className, id } = this.props;
    const { openModal } = this.state;

    return (
      <div className={clsx(className, styles.root)}>
        <div
          className={
            openModal
              ? `${styles.overlay} ${styles.overlay_show}`
              : styles.overlay
          }
          id="overlay"
        >
          <div
            className={
              openModal ? `${styles.modal} ${styles.modal_show}` : styles.modal
            }
            id="myModal"
          >
            <h3>Delete</h3>
            <div className={styles.modalContent}>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </div>
            <div className={styles.buttons}>
              <Button variant="contained" className={styles.buttonCancel} onClick={() => this.handleCloseModal()}>
                <p className={styles.btn}>cancel</p>
              </Button>
              <Button variant="contained" color="secondary">
                <p className={styles.btn}>delete</p>
              </Button>
            </div>
          </div>
        </div>
        <Button variant="contained" color="secondary"
          onClick={() => this.handleOpenModal()} >
          <p className={styles.btn}>delete</p>
        </Button>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number,
};

// const mapStateToProps = (state) => ({
//   users: getAllUsers(state),
// });

// const mapDispatchToProps = (dispatch) => ({
//   fetchPublishedUsers: () => dispatch(fetchPublishedUsers()),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export { Component as RemoveModal, Component as RemoveModalComponent };
