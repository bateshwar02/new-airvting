/**
 *
 * Following
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
import './index.css';

export function Following({
  followingData, getFollowingData, inProcess, followAction
}) {
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
            <div className="channal-card-thumbnail uk-img" style={{ background: `url(${item.featuredImage})` }} />
            <div className="channal-card-body">
              <Link to={`/browser-channel/${item._id}`}>
                <div className="channal-card-creator">
                  <img src={item.featuredImage} alt="" />
                </div>
                <h4>
                  {item.displayName}
                </h4>
              </Link>
              <div className="text-center">
                <div className="toggle1" aria-hidden="false">
                  <button className="button default custom-btn" type="button" uk-toggle="target: .toggle1" onClick={() => followAction(item._id)}>
                    Remove
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
  followAction: PropTypes.func.isRequired,
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
