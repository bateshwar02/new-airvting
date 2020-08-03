/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * My Gift
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import * as Actions from '../actions';
import Modal from '../../../components/Modal';

function TokenList({ aitTokenList, getAirToken, buyAirToken }) {
  const [isToken, setToken] = useState(false);
  const [tokenNumber, setTokenNumber] = useState(0);
  const [isValidate, setValidate] = useState(false);
  const [tokenData, setTokenData] = useState({});
  const [error, setError] = useState('Please enter your query.');

  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(aitTokenList)) {
      getAirToken();
    }
  }, [aitTokenList]);

  const onChange = (e) => {
    const { value } = e.target;
    if (Utils.isUndefinedOrNull(value)) {
      setValidate(true);
      return;
    }
    setTokenNumber(e.target.value);
    setValidate(false);
  };

  const buyAirTokenData = (evt) => {
    evt.preventDefault();
    if (isValidate) {
      return;
    }
    if (Utils.isUndefinedOrNullOrEmpty(tokenNumber) || tokenNumber === 0) {
      setError('Please eneter less than token quantity.');
      setValidate(true);
      return;
    }
    if (Number(tokenNumber) > Number(tokenData.quantity)) {
      setError('Please eneter less than token quantity.');
      setValidate(true);
      return;
    }
    setValidate(false);
    const dataObj = {
      Purchase: { receipt: 'transactionId.Web.Test' }, airTokenId: tokenData._id, currency: 'INR', price: tokenData.price, quantityToBuy: tokenNumber, title: tokenData.title
    };
    buyAirToken(dataObj);
    setToken(false);
  };

  const getContenetToken = () => (
    <div className="uk-grid-small uk-grid">
      <div className="uk-width-1-1@s">
        <div className="form-group form-group-depth-1 form-group-comment">
          <label htmlFor="tfid-0-0" className="control-label">
            <span>Token Number</span>
          </label>
          <div className="input-group">
            <input placeholder="Enter token number" name="comment" type="number" className="form-control" value={tokenNumber} onChange={onChange} />
          </div>
          {isValidate && <span className="help-block error-block">{error}</span>}
        </div>
      </div>
      <div className="uk-grid-margin">
        <span type="button" className="button warning submitButton" role="button" tabIndex={0} onClick={buyAirTokenData}>
          Submit
        </span>
      </div>
    </div>
  );

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
            <div className="airToken dropdown-option-nav buyToken" uk-dropdown="pos: bottom-right ;mode : hover ;animation: uk-animation-slide-bottom-small">
              <ul>
                <li>
                  <span onClick={() => { setTokenData(item); setToken(true); }} role="button" tabIndex={0}> Buy Token </span>
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
      { isToken && <Modal modalClass="tokenModal" onCancel={() => setToken(false)} modalHeader="" modalContent={getContenetToken()} hasFooter={false} /> }

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
