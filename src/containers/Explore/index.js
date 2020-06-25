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
import Post from './component/post';
import TabMenu from './component/tabMenu';
import SubTabMenu from './component/sub-menu';
import People from './component/people';
import Product from './component/product';
import './index.css';

export function Explore({
  inProcess, tabValue, userSubMenu, peopleFilter, getPeopleData, getDataByFilter, filter, subTabMenu
}) {
  const getChild = () => {
    switch (tabValue) {
      case 'post':
        return (
          <>
            <SubTabMenu subTabMenu={subTabMenu} getDataByFilter={getDataByFilter} filter={filter} />
            <div className="video-grid-slider mt-4" uk-slider="finite: true">
              <Post />
            </div>
          </>
        );
      case 'products':
        return (
          <>
            <Product />
          </>
        );

      default:
        return (
          <>
            <SubTabMenu subTabMenu={userSubMenu} getDataByFilter={getPeopleData} filter={peopleFilter} />
            <div className="video-grid-slider mt-4" uk-slider="finite: true">
              <People />
            </div>
          </>
        );
    }
  };

  const getExploreContent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <TabMenu />
        { getChild()}
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
  tabValue: PropTypes.string.isRequired,
  userSubMenu: PropTypes.array.isRequired,
  subTabMenu: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  getDataByFilter: PropTypes.func.isRequired,
  getPeopleData: PropTypes.func.isRequired,
  peopleFilter: PropTypes.string.isRequired,
};


const mapStateToProps = ({
  explore: {
    inProcess, tabValue, userSubMenu, subTabMenu, filter, peopleFilter
  }
}) => ({
  inProcess, tabValue, userSubMenu, subTabMenu, filter, peopleFilter
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Explore);
