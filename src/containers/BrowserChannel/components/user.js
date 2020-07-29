/**
 *
 * Followers
 *
 */

import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import Utils from '../../../utils/common';
import * as Actions from '../actions';
import Post from './post';
import Product from '../../Explore/component/product';

export function User({
  match, channelUserData, getUserDataById, followAction, inProcess
}) {
  const { id } = match.params;
  useEffect(() => {
    if (!Utils.isUndefinedOrNullOrEmpty(id)) {
      getUserDataById(id);
    }
  }, [id]);

  const getChannelData = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(channelUserData)) {
      return null;
    }
    const { userDetail } = channelUserData;
    return (
      <div className="channal">
        <div className="channal-cover">
          <img src={userDetail.coverImage} alt="" />
        </div>

        <div className="user-e-box">
          <div className="channal-details channal-detail2">
            <div className="left-side">
              <div className="channal-image ">
                <span>
                  <img src={userDetail.featuredImage} alt="" style={{ width: '48px', height: '48px' }} />
                </span>
              </div>
              <div className="channal-details-info">
                <h3>
                  {' '}
                  {userDetail.displayName}
                  {' '}
                </h3>

              </div>
            </div>
            <div className="right-side">
              <div className="btn-subscribe">
                <div className="btn-mobile btn-dekstop">
                  <Link to="/message">
                    <button type="button" className="button default circle px-5 btn-subs channal-btn">Message</button>
                  </Link>
                </div>
                <div className="follow-follwing-channal-btn btn-mobile btn-dekstop">
                  {' '}
                  <div>
                    <div className="toggle3" aria-hidden="false">
                      <button className="button default circle px-5 btn-subs channal-btn " type="button" onClick={() => followAction(userDetail._id)}>
                        {userDetail.isFollow ? 'Unfollow' : 'Follow' }
                        {inProcess && (
                        <div className="loaderWrapper">
                          <div className="customLoader" />
                        </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getStatusWrapper = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(channelUserData)) {
      return null;
    }
    const { userDetail } = channelUserData;
    return (
      <div className="main_content_inner">
        <div className="uk-grid-large uk-grid">
          <div className="uk-width-3-4@m">
            <div>
              <div className="">
                <h3 className="uk-card-title">
                  {' '}
                  {userDetail.username}
                  {' '}
                </h3>
                <p>
                  {' '}
                  {userDetail.description}
                </p>
              </div>
            </div>
          </div>
          <div className="uk-width-expand">

            <h5> Stats </h5>
            <ul className="uk-list">
              <li>
                {' '}
                {userDetail.followers}
                {' '}
                Followers
                {' '}
              </li>
              <li>
                {' '}
                {userDetail.following}
                {' '}
                Following
                {' '}
              </li>
              <li>
                {' '}
                {userDetail.posts}
                {' '}
                videos
                {' '}
              </li>
            </ul>

          </div>
        </div>
        <Post match={match} />
        <div id="user-product">
          <div className="sections-small">
            <h3> All Products </h3>
            <div
              className="uk-child-width-1-4@m uk-child-width-1-3@s uk-grid"
              uk-scrollspy="target: > div; cls: uk-animation-slide-bottom-small; delay: 100"
            />
            <Product />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {getChannelData()}
      {getStatusWrapper()}
    </>
  );
}

User.propTypes = {
  channelUserData: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  getUserDataById: PropTypes.func.isRequired,
  followAction: PropTypes.func.isRequired,
  inProcess: PropTypes.bool.isRequired,
};


const mapStateToProps = ({ browserChannel: { channelUserData, inProcess } }) => ({ channelUserData, inProcess });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(User);
