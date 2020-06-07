/**
 *
 * About
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import * as Actions from '../actions';

function GetComment({ videoData, commentData, getComment }) {
  useEffect(() => {
    getComment(videoData._id);
  }, []);


  const getContent = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(commentData)) {
      return null;
    }

    const { commentDetail } = commentData;
    return commentDetail.map((item, index) => {
      const keys = `index-key-${index}`;
      const imgSrc = !Utils.isUndefinedOrNullOrEmpty(item.owner.featuredImage) ? item.owner.featuredImage : 'assets/images/avatars/avatar-1.jpg';
      const date = new Date(item.createdAt);
      const ticks = date.getTime();
      return (
        <li key={keys}>
          <div className="avatar">
            { }
            <img src={imgSrc} alt="" />
          </div>
          <div className="comment-content">
            <div className="comment-by">
              {item.owner.displayName}
              <span>
                {' '}
                {Utils.formatDate(ticks)}
              </span>
            </div>
            <p>
              {' '}
              {item.comment}
            </p>
          </div>
        </li>
      );
    });
  };

  return (
    <div className="comments mt-4">
      <h3>
        {' '}
        Comments
        <span className="comments-amount">{!Utils.isUndefinedOrNullOrEmptyObject(commentData) ? commentData.totalComments : 0}</span>
      </h3>
      <ul>
        {getContent()}
      </ul>
    </div>
  );
}

GetComment.propTypes = {
  commentData: PropTypes.object.isRequired,
  getComment: PropTypes.func.isRequired,
  videoData: PropTypes.object.isRequired,
};


const mapStateToProps = ({ detailsVideos: { videoData, commentData } }) => ({ videoData, commentData });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(GetComment);
