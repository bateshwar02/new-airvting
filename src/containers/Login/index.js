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
import Loader from '../../components/Loader';
import './index.css';

export function Login({
  signIn, signUp, action, updateActions, inProcess
}) {
  const getComponent = () => {
    switch (action) {
      case 1:
        return <Signin setAction={updateActions} signIn={signIn} />;
      default:
        return <Singnup setAction={updateActions} signUp={signUp} />;
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
