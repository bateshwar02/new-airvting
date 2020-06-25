/**
 *
 * My Gift
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import * as Actions from '../actions';

function Gift({ myGift, getGiftData }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(myGift)) {
      getGiftData();
    }
  }, []);


  const getContent = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(myGift)) {
      return null;
    }
    const { giftDetail } = myGift;
    if (Utils.isUndefinedOrNullOrEmptyList(giftDetail)) {
      return (
        <div className="nodataFoundWraper">
          {' '}
          <span className="nodata">No Data Found </span>
        </div>
      );
    }
    return giftDetail.map((item, index) => {
      const keys = `index-key-${index}`;
      return (
        <li key={keys}>
          <div className="my-gift-store-icon my-gift-store-active">
            <span className="my-gift-store-icon-no">{item.quantity}</span>
            <img src={item.featuredImage} alt="" />
            <p>{Utils.capitalize(item.title)}</p>
            <p>
              <i className="icon-brand-bitcoin" />
              {' '}
              {item.airToken}
            </p>
          </div>
        </li>

      );
    });
  };

  return (
    <div className="uk-width-1-1 giftWrapper">
      <div className="my-gift-store-box">
        <h2>Gift Store</h2>
        <ul>
          {getContent()}
        </ul>
      </div>
    </div>
  );
}

Gift.propTypes = {
  myGift: PropTypes.object.isRequired,
  getGiftData: PropTypes.func.isRequired,
};


const mapStateToProps = ({ token: { myGift } }) => ({ myGift });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Gift);
