/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Followers
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import Utils from '../../../utils/common';
import * as Actions from '../actions';
import Navigation from '../../../utils/navigation';
import Loader from '../../../components/Loader';

export function Followers({
  match, postDataByUser, getPostDataByUserId, bookMarkAction, inProcess
}) {
  const { id } = match.params;

  useEffect(() => {
    if (!Utils.isUndefinedOrNullOrEmpty(id)) {
      getPostDataByUserId(id);
    }
  }, [id]);

  const videoPlay = (item) => {
    Navigation.push(`/sh/airvtingweb/video/${item._id}`);
  };

  const getVideoComp = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(postDataByUser)) {
      return null;
    }

    const { postDetail } = postDataByUser;
    return postDetail.map((item, index) => {
      const keys = `key-${index}`;
      const date = new Date(item.createdAt);
      const ticks = date.getTime();
      return (
        <div className="uk-first-column uk-scrollspy-inview uk-animation-slide-bottom-small imageWrapper" key={keys}>
          <div className="video-post">
            <div className="video-post-thumbnail">
              {item.isLive && <span className="video-post-count">Live</span>}
              <span className="play-btn-trigger" role="button" tabIndex={0} onClick={() => videoPlay(item)} />
              <span className="btn-option">
                <i className="icon-feather-more-vertical" />
              </span>
              <div
                className="dropdown-option-nav"
                uk-dropdown="pos: bottom-right ;mode : hover ;animation: uk-animation-slide-bottom-small"
              >
                <ul>
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

              <img src={item.featuredImage} alt="" />

            </div>
            <div className="video-post-content">
              <h3>
                {' '}
                {item.title}
              </h3>
              <img src={item.owner.featuredImage} alt="" />
              <span className="video-post-user">{item.owner.displayName}</span>
              <span className="video-post-views">
                {item.viewers}
                {' '}
                views
              </span>
              <span className="video-post-date">
                {' '}
                {Utils.formatDate(ticks)}
                {' '}
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="section-small" id="user-video">
      {getVideoComp()}
      <Loader inProcess={inProcess} />
    </div>
  );
}

Followers.propTypes = {
  postDataByUser: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  getPostDataByUserId: PropTypes.func.isRequired,
  bookMarkAction: PropTypes.func.isRequired,
  inProcess: PropTypes.bool.isRequired,
};


const mapStateToProps = ({ browserChannel: { inProcess, postDataByUser } }) => ({ postDataByUser, inProcess });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Followers);
