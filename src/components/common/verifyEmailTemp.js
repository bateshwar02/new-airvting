/**
 *
 * About
 *
 */

import React, { memo } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './index.css';

function About() {
  const getContent = () => (
    <div className="main_content">
      <div className="main_content_inner emailVerifyWrapper">
       <span>Your email has been verified successfully.</span>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      {getContent()}
      <Footer />
    </>
  );
}

About.propTypes = {};

export default memo(About);
