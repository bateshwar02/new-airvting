/**
 *
 * Watcher
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Header from '../Header';
import Sidebar from '../Sidebar';

function Watcher() {
  return (
    <div>
      <Header />
      <Sidebar />
    </div>
  );
}

Watcher.propTypes = {};

export default memo(Watcher);
