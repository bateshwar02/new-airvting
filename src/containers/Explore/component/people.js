/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * People
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import * as Actions from '../actions';
// import Navigation from '../../../utils/navigation';

function People({
  getPeopleData, peopleData, peopleFilter, followAction, fallowInProcess
}) {
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

      return (
        <div key={keys}>
          <div className="channal-card animate-this elementWrap">
            <div className="channal-card-thumbnail" style={{ background: `url(${featureImg})` }} />
            <div className="channal-card-body ">
              <a href="browse-channals.php">
                <div className="channal-card-creator">
                  <img src={featureImg} alt="" />
                </div>
              </a>
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

                  <button onClick={() => followAction(item._id)} className="button default circle px-5 btn-subs channal-btn followButton " type="button">
                    Follow
                    {fallowInProcess && (
                    <div className="loaderWrapper">
                      <div className="customLoader" />
                    </div>
                    )}
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
