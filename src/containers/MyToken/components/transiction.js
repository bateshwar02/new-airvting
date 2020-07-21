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

function Transactions({ getTransictionsData, transictionsData }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(transictionsData)) {
      getTransictionsData();
    }
  }, []);


  const getContent = transactionDetail => transactionDetail.map((item, index) => {
    const keys = `index-key-${index}`;
    const date = new Date(item.createdAt);
    const ticks = date.getTime();
    return (
      <tr key={keys}>
        <td>
          <div className="my-gift-store-table-img"><img src={!Utils.isUndefinedOrNullOrEmptyList(item.products) ? item.products[0].featuredImage : ''} alt="" style={{ height: '55px', width: '70px' }} /></div>
        </td>
        <td>{!Utils.isUndefinedOrNullOrEmptyList(item.products) && item.products[0].title}</td>
        <td>{`${item.currency} ${item.totalPrice}`}</td>
        <td>
          <span className="my-gift-store-table-icon">
            <i className="icon-brand-bitcoin" />
            {item.totalToken}
          </span>
        </td>
        <td>{Utils.formatDate(ticks)}</td>
        <td>{item.transaction}</td>
        <td>{!Utils.isUndefinedOrNullOrEmptyList(item.products) && item.products[0].displayName}</td>
        <td>{item.totalQuantity}</td>
      </tr>
    );
  });

  const childComponent = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(transictionsData)) {
      return null;
    }
    const { transactionDetail } = transictionsData;
    if (Utils.isUndefinedOrNullOrEmptyList(transactionDetail)) {
      return (
        <div className="nodataFoundWraper">
          {' '}
          <span className="nodata">No Data Found </span>
        </div>
      );
    }

    return (
      <table className="uk-table">
        <thead>
          <tr>
            <th>Title</th>
            <th />
            <th>Price</th>
            <th>Token</th>
            <th>Date</th>
            <th>Action</th>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{getContent(transactionDetail)}</tbody>
      </table>
    );
  };

  return (
    <div className="uk-width-1-1">
      <div className="my-gift-store-wallet-box">
        <h2>Wallet</h2>

        {childComponent()}

      </div>
    </div>
  );
}

Transactions.propTypes = {
  transictionsData: PropTypes.object.isRequired,
  getTransictionsData: PropTypes.func.isRequired,
};


const mapStateToProps = ({ token: { transictionsData } }) => ({ transictionsData });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Transactions);
