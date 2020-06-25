/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Post
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import * as Actions from '../actions';
import Navigation from '../../../utils/navigation';

function TabContent({
  getExploreData, exploreData, filter, addBookMark
}) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(exploreData)) {
      getExploreData(filter);
    }
  }, []);

  const videoPlay = (item) => {
    Navigation.push(`/sh/airvtingweb/video/${item._id}`);
  };

  const getContent = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(exploreData)) {
      return null;
    }

    const { postDetail } = exploreData;
    if (Utils.isUndefinedOrNullOrEmptyObject(postDetail)) {
      return null;
    }
    return postDetail.map((item, index) => {
      const keys = `${index}-keys`;
      const date = new Date(item.createdAt);
      const ticks = date.getTime();
      return (
        <li key={keys} className="videoList">
          <div className="video-post">
            <div className="video-post-thumbnail">
              {item.isLive && <span className="video-post-count">Live</span> }
              <span className="video-post-time">{Utils.formatDateAndTime(ticks, 'h:MM TT')}</span>
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
                    <span onClick={() => addBookMark(item._id)} className="actionSpan">
                      {' '}
                      <i className="uil-bookmark" />
                      {' '}
                      Add Bookmark
                    </span>
                  </li>
                  <li>
                    <span className="actionSpan">
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
                {item.title}
                {' '}
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
        </li>
      );
    });
  };

  return (
    <ul className="uk-slider-items uk-child-width-1-4@m uk-child-width-1-3@s uk-grid videoWrapper">
      {getContent()}
    </ul>
  );
}

TabContent.propTypes = {
  exploreData: PropTypes.object.isRequired,
  getExploreData: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  addBookMark: PropTypes.func.isRequired,
};


const mapStateToProps = ({ explore: { exploreData, filter } }) => ({ exploreData, filter });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TabContent);
