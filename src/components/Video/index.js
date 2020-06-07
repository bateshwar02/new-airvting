/**
 *
 * Video
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Header from '../Header';
import Sidebar from '../Sidebar';

function Video() {
  return (
    <div>
      <Header />
      <Sidebar />
    </div>
  );
}

Video.propTypes = {};

export default memo(Video);
