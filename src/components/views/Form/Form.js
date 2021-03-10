import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import styles from './Form.module.scss';

const Form = ({ className }) => (
  <div className={clsx(className, styles.root)}>
    <Paper>
      <div className={styles.title}>
        <p>Form</p>
      </div>
      <div>
        <form>
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
            <Button variant="outlined" color="secondary" className={styles.btn_cancel}>
              <p className={styles.btn}>Cancel</p>
            </Button>
            <Button variant="contained" color="primary">
              <p className={styles.btn}>Submit</p>
            </Button>
          </div>
        </form>
      </div>
    </Paper>
  </div>
);

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Form;
