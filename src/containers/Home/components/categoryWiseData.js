/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import Navigation from '../../../utils/navigation';
import ApiService from '../api';
import * as Actions from '../action';

function Category({ id, addBookMark }) {
  const [childData, setChildData] = useState([]);
  const [isProcess, setIsProcess] = useState(false);

  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyList(childData)) {
      ApiService.getDataByCategory(id).then((response) => {
        if (response.success) {
          setChildData(response.data.postDetail);
          setIsProcess(true);
        }
      }).catch((error) => {
        setIsProcess(true);
        console.log(error);
      });
    }
  }, []);

  const videoPlay = (item) => {
    Navigation.push(`/sh/airvtingweb/video/${item._id}`);
  };

  const categoryChildData = () => {
    if (Utils.isUndefinedOrNullOrEmptyList(childData) && !isProcess) {
      return (
        <div className="loaderWrapper">
          <div className="customLoader" />
        </div>
      );
    }

    return childData.map((item, index) => {
      const keys = `keys-${index}-${id}`;
      const date = new Date(item.createdAt);
      const ticks = date.getTime();
      return (
        <li key={keys}>
          <div className="video-post">
            <div className="video-post-thumbnail">
              {item.isLive && <span className="video-post-count">Live </span>}
              <span className="play-btn-trigger" role="button" tabIndex={0} onClick={() => videoPlay(item)} />
              <span className="btn-option">
                <i className="icon-feather-more-vertical" />
              </span>
              <div className="dropdown-option-nav" uk-dropdown="pos: bottom-right ;mode : hover ;animation: uk-animation-slide-bottom-small">
                <ul>
                  <li>
                    <span role="button" tabIndex={0} onClick={() => addBookMark(item._id)}>
                      {' '}
                      <i className="uil-bookmark" />
                      {' '}
                      Add Bookmark
                    </span>
                  </li>
                  <li>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        alert('Under Process');
                      }}
                    >
                      {' '}
                      <i className="uil-share-alt" />
                      {' '}
                      Share Your Friends
                    </span>
                  </li>
                </ul>
              </div>
              <span className="videoImageWrapper">
                <img src={item.featuredImage} alt="" />
              </span>
            </div>
            <div className="video-post-content">
              <h3>
                {' '}
                {item.title}
                {' '}
              </h3>
              <img src={item.owner.featuredImage} alt="" />
              <span className="video-post-user">{item.owner.displayName}</span>
              <span className="video-post-views">
                {item.owner.viewers}
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
    <>
      {categoryChildData()}
    </>

  );
}

Category.propTypes = {
  addBookMark: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = ({ home: { categoryData } }) => ({ categoryData });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Category);
