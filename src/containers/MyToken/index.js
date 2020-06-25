/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/**
 *
 * My Token
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
import Gift from './components/gift';
import Tranc from './components/transiction';
import Loader from '../../components/Loader';
import './index.css';


export function MyToken({ inProcess }) {
  const getComponent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <div className="my-gift-store-main-box">
          <h4 className="my-gift-store-main-hadding">
            {' '}
            MY TOKEN
            <span>
              <i className="icon-brand-bitcoin" />
              2812
            </span>
          </h4>
          <div className="uk-grid">
            <Gift />
            <Tranc />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  return (
    <>
      <Header />
      <Sidebar />
      {getComponent()}
      <Loader inProcess={inProcess} />
    </>
  );
}

MyToken.propTypes = {
  inProcess: PropTypes.bool.isRequired
};


const mapStateToProps = ({ token: { inProcess } }) => ({ inProcess });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyToken);
