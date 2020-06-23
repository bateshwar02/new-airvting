import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import * as Actions from '../actions';

function Earning({ gift, getGift }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(gift)) {
      getGift();
    }
  }, []);


  const getGiftListing = data => data.map((item, index) => {
    const keys = `keys-${index}`;
    return (
      <li key={keys}>
        <div className="my-gift-store-icon my-gift-store-active total-earning-ul-box">
          <span className="my-gift-store-icon-no">3</span>
          <img src={item.featuredImage} alt="" />
          <p>{Utils.capitalize(item.title)}</p>
          <p>
            <i className="icon-brand-bitcoin" />
            {' '}
            {item.quantity}
          </p>
        </div>
      </li>
    );
  }, []);

  const childComp = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(gift)) {
      return null;
    }
    const { giftDetail } = gift;
    return (
      <div className="my-gift-store-box">
        <h3 className="total-earning-hadding"> Your Gift </h3>
        <div className="total-earning-price-box">
          <span>Total Earnings</span>
          <span>
            <i className="icon-brand-bitcoin" />
            {gift.totalGift}
          </span>
        </div>
        <ul className="total-earning-ul">
          {!Utils.isUndefinedOrNullOrEmptyList(giftDetail) && getGiftListing(giftDetail)}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className="p-3">
        <h5 className="mb-0"> Your Earning</h5>
      </div>
      <hr className="m-0" />
      {childComp()}
    </>
  );
}

Earning.propTypes = {
  gift: PropTypes.object.isRequired,
  getGift: PropTypes.func.isRequired,
};

const mapStateToProps = ({ setting: { gift }, userDetails: { userData } }) => ({ gift, userData });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Earning);
