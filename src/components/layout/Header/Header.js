import React from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Header.module.scss';

const Component = ({ className }) => (
  <div className={clsx(className, styles.root)}>

    <div className={styles.container}>
      <h1>Dashboard</h1>
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Header,
  Component as HeaderComponent,
};
