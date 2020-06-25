/**
 *
 * Login
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import * as Actions from './actions';
import Signin from './components/login';
import Singnup from './components/sign-up';
import ResetPassword from './components/forgetPass';
import Loader from '../../components/Loader';
import './index.css';

export function Login({
  signIn, signUp, action, updateActions, inProcess, socialLogin, sendEmailToResetPass
}) {
  const getComponent = () => {
    switch (action) {
      case 1:
        return <Signin setAction={updateActions} signIn={signIn} socialLogin={socialLogin} />;
      case 2:
        return <Singnup setAction={updateActions} signUp={signUp} />;
      default:
        return <ResetPassword setAction={updateActions} sendEmailToResetPass={sendEmailToResetPass} />;
    }
  };

  return (
    <>
      {getComponent()}
      <Loader inProcess={inProcess} />
    </>
  );
}

Login.propTypes = {
  signUp: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  updateActions: PropTypes.func.isRequired,
  action: PropTypes.number.isRequired,
  inProcess: PropTypes.bool.isRequired,
  socialLogin: PropTypes.func.isRequired,
  sendEmailToResetPass: PropTypes.func.isRequired,
};

const mapStateToProps = ({ login: { action, inProcess }, userDetails: { userData } }) => ({ userData, action, inProcess });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);
