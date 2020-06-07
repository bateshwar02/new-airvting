/**
 *
 * Following
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';

import * as Actions from './actions';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import DataNotFound from '../../components/NoDataFound';
import Utils from '../../utils/common';
import Loader from '../../components/Loader';

export function Following({ followingData, getFollowingData, inProcess }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyList(followingData)) {
      getFollowingData();
    }
  }, [followingData, getFollowingData]);

  const getFollowingWrapperList = () => {
    if (Utils.isUndefinedOrNullOrEmptyList(followingData)) {
      return null;
    }
    return followingData.map((item, index) => {
      const keys = `keys-${index}`;
      return (
        <div key={keys}>
          <div className="channal-card animate-this">
            <div className="channal-card-thumbnail uk-img" style={{ background: 'url(assets/images/channals/img-3.jpg)' }} />
            <div className="channal-card-body">
              <a href="browse-channals.php">
                <div className="channal-card-creator">
                  <img src="assets/images/avatars/avatar-5.jpg" alt="" />
                </div>
              </a>
              <h4>
                {item.firstName}
                {' '}
                {item.lastName}
                {' '}
              </h4>
              <p>
                {' '}
                <span>20K Followers . 26 Videos . 11k phtos . 200k Products</span>
                {' '}
              </p>
              <div className="text-center">
                <div className="toggle1" aria-hidden="false">
                  <button className="button default custom-btn" type="button" uk-toggle="target: .toggle1">
                    Follwing
                  </button>
                </div>
              </div>
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
          <h3> following </h3>
          <div className="sections-small">
            <div className="uk-child-width-1-4@m uk-child-width-1-3@s uk-grid">{getFollowingWrapperList()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>Following</title>
        <meta name="description" content="Description of Following" />
      </Helmet>
      <Sidebar />
      <Header />
      {!Utils.isUndefinedOrNullOrEmptyList(followingData) && getContent()}
      {!Utils.isUndefinedOrNullOrEmptyList(followingData) && <DataNotFound />}
      <Loader inProcess={inProcess} />
    </div>
  );
}

Following.propTypes = {
  followingData: PropTypes.array.isRequired,
  getFollowingData: PropTypes.func.isRequired,
  inProcess: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ following: { followingData, inProcess } }) => ({ followingData, inProcess });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Following);
