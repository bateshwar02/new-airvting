/**
 *
 * Followers
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';

import Utils from '../../utils/common';
import * as Actions from './actions';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import DataNotFound from '../../components/NoDataFound';
import Loader from '../../components/Loader';
import './index.css';

export function Followers({ followersData, getFollowersData, inProcess }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyList(followersData)) {
      getFollowersData();
    }
  }, [followersData, getFollowersData]);

  const getFollowersDataWrapper = () => {
    if (Utils.isUndefinedOrNullOrEmptyList(followersData)) {
      return null;
    }
    return followersData.map((item, index) => {
      const keys = `key-${index}`;
      return (
        <div key={keys}>
          <div className="channal-card animate-this">
            <div className="channal-card-thumbnail" style={{ background: `url(${item.featuredImage})` }} />
            <div className="channal-card-body">
              <Link to={`/browser-channel/${item._id}`}>
                <div className="channal-card-creator">
                  <img src={item.featuredImage} alt="" />
                </div>
                <h4>
                  {item.displayName}
                </h4>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  };

  const getContent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <div className="followe-box">
          <h3> follower </h3>
          <div className="sections-small">
            <div className="uk-child-width-1-4@m uk-child-width-1-3@s uk-grid">{getFollowersDataWrapper()}</div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );

  return (
    <div id="wrapper">
      <Helmet>
        <title>Followers</title>
        <meta name="description" content="Description of Followers" />
      </Helmet>
      <Sidebar />
      <Header />
      {!Utils.isUndefinedOrNullOrEmptyList(followersData) && getContent()}
      {!Utils.isUndefinedOrNullOrEmptyList(followersData) && <DataNotFound />}
      <Loader inProcess={inProcess} />
    </div>
  );
}

Followers.propTypes = {
  followersData: PropTypes.array.isRequired,
  getFollowersData: PropTypes.func.isRequired,
  inProcess: PropTypes.bool.isRequired,
};


const mapStateToProps = ({ followers: { followersData, inProcess } }) => ({ followersData, inProcess });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Followers);
