import React, { memo } from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import Utils from '../../utils/common';
import './index.css';

function Google({ socialLogin }) {
  const responseGoogle = (response) => {
    if (Utils.isUndefinedOrNullOrEmptyObject(response) || Utils.isUndefinedOrNullOrEmptyObject(response.profileObj)) {
      return;
    }
    const { profileObj, tokenId } = response;
    const formData = {};
    formData.birth = '';
    formData.email = !Utils.isUndefinedOrNullOrEmpty(profileObj.email) ? profileObj.email : '';
    formData.featuredImage = !Utils.isUndefinedOrNullOrEmpty(profileObj.imageUrl) ? profileObj.imageUrl : '';
    formData.firstName = !Utils.isUndefinedOrNullOrEmpty(profileObj.givenName) ? profileObj.givenName : '';
    formData.lastName = !Utils.isUndefinedOrNullOrEmpty(profileObj.familyName) ? profileObj.familyName : '';
    formData.phoneNumber = '';
    formData.socialId = !Utils.isUndefinedOrNullOrEmpty(profileObj.googleId) ? profileObj.googleId : '';
    formData.socialToken = !Utils.isUndefinedOrNullOrEmpty(tokenId) ? tokenId : '';
    formData.socialType = 'google';
    formData.username = '';
    socialLogin(formData);
  };

  const error = (msg) => {
    console.log(msg);
  };

  return (
    <div className="googleWrapper">
      <GoogleLogin
        clientId="422703669313-7aqglrljcqpa6il48km7bpfiq55cggnr.apps.googleusercontent.com"
        buttonText="Google Login"
        onSuccess={responseGoogle}
        onFailure={error}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
}

Google.propTypes = {
  socialLogin: PropTypes.func.isRequired,
};

export default memo(Google);
