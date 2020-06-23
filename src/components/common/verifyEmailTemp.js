/**
 *
 * About
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Header from '../Header';
import Footer from '../Footer';
import * as Actions from '../../containers/Settings/actions';
import Loader from '../Loader';
import './index.css';

function About({
  match, verifyEmail, inProcess, emailVerifyMsg
}) {
  useEffect(() => {
    const { token } = match.params;
    const objectData = { token };
    verifyEmail(objectData);
  }, []);

  const getContent = () => (
    <div className="main_content">
      <div className="main_content_inner emailVerifyWrapper">
        <span>
          {emailVerifyMsg}
          .
        </span>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      {!inProcess && getContent()}
      <Loader inProcess={inProcess} />
      <Footer />
    </>
  );
}

About.propTypes = {
  match: PropTypes.object.isRequired,
};
About.propTypes = {
  verifyEmail: PropTypes.func.isRequired,
  inProcess: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  emailVerifyMsg: PropTypes.string.isRequired,
};


const mapStateToProps = ({ setting: { inProcess, emailVerifyMsg }, userDetails: { userData } }) => ({ userData, inProcess, emailVerifyMsg });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(About);
