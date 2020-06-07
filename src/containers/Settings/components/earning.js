import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
// import Utils from '../../../utils/common';
import * as Actions from '../actions';

function Earning() {
  return (
    <>
      <div className="p-3">
        <h5 className="mb-0"> Your Earning</h5>
      </div>
      <hr className="m-0" />
      <div className="my-gift-store-box">
        <h3 className="total-earning-hadding"> Your Gift </h3>
        <div className="total-earning-price-box">
          <span>Total Earnings</span>
          <span>
            <i className="icon-brand-bitcoin" />
            3423
          </span>
        </div>
        <ul className="total-earning-ul">
          <li>
            <div className="my-gift-store-icon my-gift-store-active total-earning-ul-box">
              <span className="my-gift-store-icon-no">3</span>
              <img src="assets/images/video-thumbal/ring.png" alt="" />
              <p>Ring</p>
              <p>
                <i className="icon-brand-bitcoin" />
                {' '}
                12
              </p>
            </div>
          </li>
          <li>
            <div className="my-gift-store-icon total-earning-ul-box">
              <img src="assets/images/video-thumbal/ring.png" alt="" />
              <p>Ring</p>
              <p>
                <i className="icon-brand-bitcoin" />
                {' '}
                12
              </p>
            </div>
          </li>
          <li>
            <div className="my-gift-store-icon my-gift-store-active total-earning-ul-box">
              <span className="my-gift-store-icon-no">2</span>
              <img src="assets/images/video-thumbal/ring.png" alt="" />
              <p>Ring</p>
              <p>
                <i className="icon-brand-bitcoin" />
                {' '}
                12
              </p>
            </div>
          </li>
          <li>
            <div className="my-gift-store-icon total-earning-ul-box">
              <img src="assets/images/video-thumbal/ring.png" alt="" />
              <p>Ring</p>
              <p>
                <i className="icon-brand-bitcoin" />
                {' '}
                12
              </p>
            </div>
          </li>
          <li>
            <div className="my-gift-store-icon total-earning-ul-box">
              <img src="assets/images/video-thumbal/ring.png" alt="" />
              <p>Ring</p>
              <p>
                <i className="icon-brand-bitcoin" />
                {' '}
                12
              </p>
            </div>
          </li>
          <li>
            <div className="my-gift-store-icon total-earning-ul-box">
              <img src="assets/images/video-thumbal/ring.png" alt="" />
              <p>Ring</p>
              <p>
                <i className="icon-brand-bitcoin" />
                {' '}
                12
              </p>
            </div>
          </li>
          <li>
            <div className="my-gift-store-icon total-earning-ul-box">
              <img src="assets/images/video-thumbal/ring.png" alt="" />
              <p>Ring</p>
              <p>
                <i className="icon-brand-bitcoin" />
                {' '}
                12
              </p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

Earning.propTypes = { };

const mapStateToProps = ({ userDetails: { userData } }) => ({ userData });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Earning);
