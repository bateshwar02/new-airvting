/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as Actions from './action';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer/index';
import Loader from '../../components/Loader';
import Category from './components/category';
import Share from '../../components/Share';
import Post from './components/postData';
import CurrentPost from './components/currentPost';
import './index.css';

function HomePage({
  inProcess, updateShare, url, isShare, isSearch
}) {
  const getHomeContent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <div
          className="uk-position-relative uk-visible-toggle uk-light"
          tabIndex="-1"
          uk-slideshow="animation: push ;min-height: 200; max-height: 400 ;autoplay: t rue"
        >
          <ul className="uk-slideshow-items rounded">
            <CurrentPost />
          </ul>
        </div>
        { !isSearch && <Category />}
        { isSearch && <Post />}
        <Footer />
      </div>
    </div>
  );

  return (
    <div id="wrapper">
      <Helmet>
        <title>Airvting</title>
        <meta name="description" content="Description of Followers" />
      </Helmet>
      <Header />
      <Sidebar />
      {getHomeContent()}
      <Loader inProcess={inProcess} />
      {isShare && <Share onClose={updateShare} url={url} />}
    </div>
  );
}

HomePage.propTypes = {
  inProcess: PropTypes.bool.isRequired,
  updateShare: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  isShare: PropTypes.bool.isRequired,
  isSearch: PropTypes.bool.isRequired,
};


const mapStateToProps = ({
  home: {
    categoryData, inProcess, isShare, url
  }, userDetails: { userData, isSearch }, live: { postData },
}) => ({
  userData, categoryData, inProcess, isShare, url, isSearch, postData
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
