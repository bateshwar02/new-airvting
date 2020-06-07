/**
 *
 * Loader
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './index.css';

function Loader({ inProcess }) {
  if (!inProcess) {
    return null;
  }

  return (
    <div className="showbox" disabled>
      <div className="loader">
        <svg className="circular" viewBox="25 25 50 50">
          <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
        </svg>
      </div>
    </div>
  );
}

Loader.propTypes = {
  inProcess: PropTypes.bool,
};

Loader.defaultProps = {
  inProcess: false,
};

export default memo(Loader);
