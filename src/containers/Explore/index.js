/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * Explore
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';


import * as Actions from './actions';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import TabData from './component/tabData';
import TabMenu from './component/tabMenu';
import './index.css';

export function Explore({ inProcess }) {
  const getExploreContent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <TabMenu />
        <div className="video-grid-slider mt-4" uk-slider="finite: true">
          <TabData />
        </div>
      </div>
    </div>
  );

  return (
    <div id="wrapper">
      <Sidebar />
      <Header />
      {getExploreContent()}
      <Loader inProcess={inProcess} />
    </div>
  );
}

Explore.propTypes = {
  inProcess: PropTypes.bool.isRequired,
};


const mapStateToProps = ({ explore: { inProcess } }) => ({ inProcess });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Explore);
