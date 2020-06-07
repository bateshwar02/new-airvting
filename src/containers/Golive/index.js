/**
 *
 * Golive
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';

import * as Actions from './actions';

export function Golive() {
  return (
    <div>
      <Helmet>
        <title>Golive</title>
        <meta name="description" content="Description of Golive" />
      </Helmet>
    </div>
  );
}

Golive.propTypes = {};


const mapStateToProps = ({ golive }) => ({ golive });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Golive);
