/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/**
 *
 * LikeVideos
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';

import Utils from '../../utils/common';
import Navigation from '../../utils/navigation';
import * as Actions from './actions';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';

export function LikeVideos({
  likeVideosData, getLikedVideosData, bookMarkAction, inProcess
}) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(likeVideosData)) {
      getLikedVideosData();
    }
  }, [getLikedVideosData, likeVideosData]);

  const videoPlay = (item) => {
    Navigation.push(`/sh/airvtingweb/video/${item._id}`);
  };

  const getDataWrapper = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(likeVideosData)) {
      return null;
    }
    const { postDetail } = likeVideosData;
    return postDetail.map((item, index) => {
      const date = new Date(item.createdAt);
      const ticks = date.getTime();
      const keys = `${index}-keys`;
      return (
        <div className="video-post video-post-list" key={keys}>
          <div className="video-post-thumbnail">
            <span className="play-btn-trigger" role="button" tabIndex={0} onClick={() => videoPlay(item)} />
            <span className="video-post-time">23:00</span>
            <img src={item.featuredImage} alt="" />
          </div>
          <div className="video-post-content">
            <h3>
              {item.title}
              {' '}
            </h3>
            <span className="video-post-user">{item.owner.displayName}</span>
            <span className="video-post-views">
              {!Utils.isUndefinedOrNullOrEmpty(item.viewers) && item.viewers !== 0 && `${item.viewers} views`}
            </span>
            <span className="video-post-date">
              {' '}
              {Utils.formatDate(ticks)}
              {' '}
            </span>
            <p>
              {' '}
              {item.description}
            </p>
            <span className="btn-option">
              <i className="icon-feather-more-vertical" />
            </span>
            <div className="dropdown-option-nav" uk-dropdown="pos: bottom-right ;mode : hover">
              <ul>
                <li>
                  <span>
                    {' '}
                    <i className="uil-history" />
                    {' '}
                    Watch Later
                  </span>
                </li>
                <li>
                  <span onClick={() => bookMarkAction({ id: item._id })} role="button" tabIndex={0}>
                    {' '}
                    <i className="uil-bookmark" />
                    {' '}
                    Add Bookmark
                  </span>
                </li>
                <li>
                  <span>
                    {' '}
                    <i className="uil-share-alt" />
                    {' '}
                    Share Your Friends
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    });
  };

  const getUserProfile = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(likeVideosData)) {
      return null;
    }

    return (
      <div className="uk-width-1-4@m uk-flex-last@m">
        <div className="uk-card-default rounded" uk-sticky="top:10; offset: 90; bottom: true; media: @m;">
          <div className="text-center p-3">
            <img src="assets/images/avatars/home-profile.jpg" className="avatar-large circle m-auto my-3" alt="" />
            <h4 className="mb-1"> Thomas Bruns </h4>
            <p className="uk-text-small text-muted"> Since 2016</p>
          </div>
          <hr className="my-0" />
          <ul className="uk-list uk-list-divider uk-margin-small-top pt-1 pb-2">
            <i>
              <span className="ml-4">
                <i className="uil-user mr-1" />
                Subscriptions
                {' '}
                <span className="pr-4 uk-float-right"> 122</span>
                {' '}
              </span>
            </i>
            <li>
              <span href="#" className="ml-4">
                <i className="uil-cloud-upload mr-1" />
                Uploads
                {' '}
                <span className="pr-4 uk-float-right"> 12</span>
              </span>
            </li>
            <li>
              <span className="ml-4">
                <i className="uil-thumbs-up mr-1" />
                Likes
                {' '}
                <span className="pr-4 uk-float-right"> 43</span>
              </span>
            </li>
            <li>
              <span className="ml-4">
                <i className="uil-layers mr-1" />
                Playlists
                {' '}
                <span className="pr-4 uk-float-right"> 2</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const getContent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <div className="uk-grid">
          {getUserProfile()}
          <div className="uk-width-3-4@m">
            <div className="section-header mb-5 border-bottom uk-flex-middle">
              <div className="section-header-left">
                <h3> Your Liked Videos</h3>
              </div>
              <div className="section-header-right">
                <div className="display-as">
                  <span uk-tooltip="title: Veiw as list; pos: top-right">
                    <i className="icon-feather-grid" />
                  </span>
                  <a href="your-watch-later.php" className="active" uk-tooltip="title: Veiw as Grid; pos: top-right">
                    <i className="icon-feather-list" />
                  </a>
                </div>
              </div>
            </div>
            {getDataWrapper()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>Like Videos</title>
        <meta name="description" content="Description of LikeVideos" />
      </Helmet>
      <Sidebar />
      <Header />
      {getContent()}
      <Loader inProcess={inProcess} />
    </div>
  );
}

LikeVideos.propTypes = {
  likeVideosData: PropTypes.object.isRequired,
  getLikedVideosData: PropTypes.func.isRequired,
  bookMarkAction: PropTypes.func.isRequired,
  inProcess: PropTypes.bool.isRequired,
};


const mapStateToProps = ({ likedVideos: { likeVideosData, inProcess } }) => ({ likeVideosData, inProcess });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LikeVideos);
