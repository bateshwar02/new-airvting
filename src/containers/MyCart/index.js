/* eslint-disable default-case */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/**
 *
 * Store
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as Actions from './actions';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import CartList from './components/cartList';
import Address from './components/billingAddress';
import Payment from './components/payment';
import './index.css';

export function MyCarts({ step }) {
  const getChildCompoenent = () => {
    switch (step) {
      case 1:
        return <CartList />;
      case 2:
        return <Address />;
      case 3:
        return <Payment />;
    }
    return null;
  };

  const getStoreContent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        {getChildCompoenent()}
      </div>
      <Footer />
    </div>
  );

  return (
    <div id="wrapper">
      <Sidebar />
      <Header />
      {getStoreContent()}
    </div>
  );
}

MyCarts.propTypes = {
  step: PropTypes.number.isRequired
};


const mapStateToProps = ({ carts: { step } }) => ({ step });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyCarts);
