/**
 *
 * Featured
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';

import Utils from '../../utils/common';
import * as Actions from './actions';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';
import './index.css';

export function Featured({ featuredData, getFeaturedData, inProcess }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(featuredData)) {
      getFeaturedData();
    }
  }, [featuredData, getFeaturedData]);

  const getDataWrapper = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(featuredData)) {
      return null;
    }
    const { postDetail } = featuredData;
    return postDetail.map((item, index) => {
      const keys = `${index}-keys`;
      return (
        <div className="componentWrapper" key={keys}>
          <a href="category-inner.php">
            <div className="catagroy-card" style={{ background: `url(${item.featuredImage})` }}>
              <div className="catagroy-card-content">
                <h4>
                  {' '}
                  {item.title}
                  {' '}
                </h4>
              </div>
            </div>
          </a>
        </div>
      );
    });
  };

  const getContent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <nav className="responsive-tab">
          <ul>
            <li className="uk-active">
              <span href="#">
                {' '}
                <i className="uil-video" />
                {' '}
                Featured
                {' '}
              </span>
            </li>
          </ul>
        </nav>

        <div className="section-small">
          <div className="uk-child-width-1-4@m uk-child-width-1-3@s uk-grid">{getDataWrapper()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>Featured</title>
        <meta name="description" content="Description of Featured" />
      </Helmet>
      <Sidebar />
      <Header />
      {getContent()}
      <Loader inProcess={inProcess} />
    </div>
  );
}

Featured.propTypes = {
  featuredData: PropTypes.object.isRequired,
  getFeaturedData: PropTypes.func.isRequired,
  inProcess: PropTypes.bool.isRequired,
};


const mapStateToProps = ({ featured: { featuredData, inProcess } }) => ({ featuredData, inProcess });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Featured);
