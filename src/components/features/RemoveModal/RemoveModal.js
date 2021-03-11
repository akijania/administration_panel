import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { removeUserRequest } from '../../../redux/usersRedux';
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
  handleRemoveUser = () => {
    const { id, removeUserRequest } = this.props;
    console.log(id);
    removeUserRequest(id);
    this.setState({
      openModal: false,
    });
  };
  render() {
    const { className } = this.props;
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
              <Button variant="contained" color="secondary" onClick={() => this.handleRemoveUser()} >
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
  removeUserRequest: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  removeUserRequest: (id) => dispatch(removeUserRequest(id)),
});

const Container = connect(null, mapDispatchToProps)(Component);

export { Container as RemoveModal, Component as RemoveModalComponent };
