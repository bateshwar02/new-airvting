/**
 *
 * Followers
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Utils from '../../utils/common';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import UserWrapper from './components/user';
import './index.css';

export function BrowserChannel({ match }) {
  const getContent = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(match)) {
      return null;
    }
    return (
      <div className="main_content">
        <UserWrapper match={match} />
        <Footer />
      </div>
    );
  };

  return (
    <div id="wrapper">
      <Helmet>
        <title>Browser Channel</title>
        <meta name="description" content="Description of Followers" />
      </Helmet>
      <Sidebar />
      <Header />
      {getContent()}
    </div>
  );
}

BrowserChannel.propTypes = {
  match: PropTypes.object.isRequired,
};


export default memo(BrowserChannel);
