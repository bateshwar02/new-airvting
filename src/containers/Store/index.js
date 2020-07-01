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
// import ProductList from './components/product-list';
import AirToken from './components/ait-token-list';
import Lodaer from '../../components/Loader';
import TabMenu from './components/tabMenu';
import Footer from '../../components/Footer';
import Product from '../Explore/component/productByCategory';
import './index.css';

export function Store({ inProcess, tabValue }) {
  const getStoreContent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <TabMenu />
        {tabValue === 'product' && <Product />}
        {tabValue === 'airToken' && <AirToken />}
      </div>
      <Footer />
    </div>
  );

  return (
    <div id="wrapper">
      <Sidebar />
      <Header />
      {getStoreContent()}
      <Lodaer inProcess={inProcess} />
    </div>
  );
}

Store.propTypes = {
  inProcess: PropTypes.bool.isRequired,
  tabValue: PropTypes.string.isRequired,
};


const mapStateToProps = ({ store: { inProcess, tabValue } }) => ({ inProcess, tabValue });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Store);
