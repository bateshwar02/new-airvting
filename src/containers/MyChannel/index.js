/**
 *
 * MyChannel
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';

import * as Actions from './actions';

export function MyChannel() {
  return (
    <div>
      <Helmet>
        <title>MyChannel</title>
        <meta name="description" content="Description of MyChannel" />
      </Helmet>
    </div>
  );
}

MyChannel.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = ({ myChannel }) => ({ myChannel });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyChannel);
