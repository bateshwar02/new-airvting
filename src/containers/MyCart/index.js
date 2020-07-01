/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/**
 *
 * Store
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as Actions from './actions';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import CartList from './components/cartList';
import './index.css';

export function MyCarts() {
  const getStoreContent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <div className="m-cart-box">
          <h2> MY CART </h2>
          <div className="uk-grid dataWrap">
            <div className="uk-width-1-1">
              <div className="my-cart-box">
                <CartList />
              </div>
            </div>
          </div>
        </div>
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

MyCarts.propTypes = {};


const mapStateToProps = ({ carts }) => ({ carts });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyCarts);
