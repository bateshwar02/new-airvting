/**
 *
 * MyChannel
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Conversation from './component/notificationList';
import './index.css';

export function Notification() {
  const getContent = () => (
    <div className="main_content">
      <div className="main_content_inner ">
        <div className="message-page-content-box">
          <h2> Notifications </h2>
          <div className="add-new-message-box" />
          <Conversation />
        </div>
      </div>
      <Footer />
    </div>

  );

  return (
    <div>
      <Helmet>
        <title>Notification</title>
        <meta name="description" content="Description of MyChannel" />
      </Helmet>
      <Header />
      <Sidebar />
      {getContent()}
    </div>
  );
}

export default (Notification);
