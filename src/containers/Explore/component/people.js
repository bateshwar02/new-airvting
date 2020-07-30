/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * People
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import * as Actions from '../actions';
import Loader from '../../../components/Loader';
// import Navigation from '../../../utils/navigation';

function People({
  getPeopleData, peopleData, peopleFilter, followAction, fallowInProcess
}) {
  const [followArr, setFollowArr] = useState([]);

  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(peopleData)) {
      getPeopleData(peopleFilter);
    }
  }, []);

  const getContent = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(peopleData)) {
      return null;
    }

    const { userDetail } = peopleData;
    if (Utils.isUndefinedOrNullOrEmptyObject(userDetail)) {
      return null;
    }
    return userDetail.map((item, index) => {
      const keys = `${index}-keys`;
      const date = new Date(item.createdAt);
      const ticks = date.getTime();
      let featureImg = 'assets/images/default.jpg';
      if (!Utils.isUndefinedOrNullOrEmpty(item.featuredImage)) {
        featureImg = item.featuredImage;
      }

      const follow = (id) => {
        const arrData = Utils.deepCopy(followArr);
        if (!arrData.includes(id)) {
          arrData.push(id);
        } else {
          arrData.splice(arrData.indexOf(5), 1);
        }

        setFollowArr(arrData);
        followAction(id);
      };

      return (
        <div key={keys}>
          <div className="channal-card animate-this elementWrap">
            <div className="channal-card-thumbnail" style={{ background: `url(${featureImg})` }} />
            <div className="channal-card-body ">
              <Link to={`/browser-channel/${item._id}`}>
                <div className="channal-card-creator" style={{ height: '42px', width: '42px' }}>
                  <img src={featureImg} alt="" style={{ height: '42px', width: '42px' }} />
                </div>
              </Link>
              <h4>
                {item.displayName}
                {' '}
              </h4>
              <p>
                {' '}
                <span>{`${item.listPosts} Posts, ${Utils.formatDate(ticks)}`}</span>
                {' '}
              </p>
              <div className="text-center">
                <span>
                  {/* <button type="button" className="button default  custom-btn">
                    Remove
                  </button> */}

                  <button onClick={() => follow(item._id)} className="button default circle px-5 btn-subs channal-btn followButton " type="button">

                    {
                      followArr.includes(item._id) ? 'Remove' : 'Follow'
                    }
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="followe-box peopleWrapper">
      <div className="sections-small">
        <div className="uk-child-width-1-4@m uk-child-width-1-3@s uk-grid">
          {getContent()}
        </div>
      </div>
      <Loader inProcess={fallowInProcess} />
    </div>
  );
}

People.propTypes = {
  peopleData: PropTypes.object.isRequired,
  getPeopleData: PropTypes.func.isRequired,
  peopleFilter: PropTypes.string.isRequired,
  fallowInProcess: PropTypes.bool.isRequired,
  followAction: PropTypes.func.isRequired,
};


const mapStateToProps = ({ explore: { peopleData, peopleFilter, fallowInProcess } }) => ({ peopleData, peopleFilter, fallowInProcess });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(People);
