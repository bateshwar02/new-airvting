/* eslint-disable jsx-a11y/click-events-have-key-events */
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

function TokenList({ aitTokenList, getAirToken, buyAirToken }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(aitTokenList)) {
      getAirToken();
    }
  }, [aitTokenList]);

  const buyAirTokenData = (data) => {
    const dataObj = {
      Purchase: { receipt: 'transactionId.Web.Test' }, airTokenId: data._id, currency: 'INR', price: data.price, quantityToBuy: data.quantity, title: data.title
    };
    console.log('dataObj ====', dataObj);
    buyAirToken(dataObj);
  };

  const getContent = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(aitTokenList)) {
      return null;
    }
    const { airTokenDetail } = aitTokenList;
    if (Utils.isUndefinedOrNullOrEmptyList(airTokenDetail)) {
      return (
        <div className="nodataFoundWraper">
          {' '}
          <span className="nodata">No Data Found </span>
        </div>
      );
    }
    return airTokenDetail.map((item, index) => {
      const keys = `index-key-${index}`;
      return (
        <span key={keys} className="my-gift-store-icon my-gift-store-active tokenList">
          <div className="wrap">
            <span className="btn-option butonWrap">
              <i className="icon-feather-more-vertical" />
            </span>
            <div className="airToken dropdown-option-nav" uk-dropdown="pos: bottom-right ;mode : hover ;animation: uk-animation-slide-bottom-small">
              <ul>
                <li>
                  <span onClick={() => buyAirTokenData(item)} role="button" tabIndex={0}> Buy Token </span>
                </li>
              </ul>
            </div>
            <span className="my-gift-store-icon-no">{item.quantity}</span>
            <img src="assets/images/token.jpg" alt="" />
            <p>{Utils.capitalize(item.title)}</p>
            <p>{item.token}</p>
            <p>
              <i className="icon-brand-bitcoin" />
              {' '}
              {item.price}
            </p>
          </div>
        </span>
      );
    });
  };

  return (
    <div className="store-box-div">
      <h3> Token Lists </h3>
      <div className="contentWrap">
        {getContent()}
      </div>
    </div>
  );
}

TokenList.propTypes = {
  aitTokenList: PropTypes.object.isRequired,
  getAirToken: PropTypes.func.isRequired,
  buyAirToken: PropTypes.func.isRequired,
};


const mapStateToProps = ({ store: { aitTokenList } }) => ({ aitTokenList });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TokenList);
