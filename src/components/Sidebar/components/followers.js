import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as Actions from '../../../containers/Followers/actions';
import Utils from '../../../utils/common';
import Navigation from '../../../utils/navigation';

function Followers({ followersData, getFollowersData, inProcess }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyList(followersData)) {
      getFollowersData();
    }
  }, [followersData, getFollowersData]);

  const getFollowerList = () => {
    if (Utils.isUndefinedOrNullOrEmptyList(followersData) && inProcess) {
      return (
        <div className="loaderWrapper">
          <div className="customLoader" />
        </div>
      );
    }
    const dataArray = followersData.reduce((temp, value) => {
      if (temp.length < 4) temp.push(value);
      return temp;
    }, []);
    return dataArray.map((item, index) => {
      const keys = `key-${index}`;
      return (
        <li key={keys}>
          <Link to={`/browser-channel/${item._id}`}>
            <span>
              {' '}
              <img src={item.featuredImage} alt="" style={{ height: '30px' }} />
              {item.displayName}
              {' '}
              {item.isLive && <span className="dot-notiv" />}
            </span>
          </Link>
        </li>
      );
    });
  };

  return (
    <div className="sections">
      <h3> followers </h3>
      <ul>
        {getFollowerList()}
      </ul>
      {
          followersData.length > 4 && (
          <div className="uk-flex uk-flex-center mb-3">
            <Link to={Navigation.followers}>
              <span className="button default circle px-5">
                <i className="uil-plus mr-2" />
                {' '}
                More followers
              </span>
            </Link>
          </div>
          )
      }
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
