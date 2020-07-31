/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import airvForm from '../../../components/form';
import Utils from '../../../utils/common';

function Login({ setAction, sendEmailToResetPass }) {
  const passForm = useRef(null);
  const [passFormValue, setPassForm] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChange = (formValue) => {
    if (isSubmitted) {
      passForm.current.validate();
    }
    setPassForm(formValue);
  };

  const formSchema = { email: airvForm.refinements.email };

  const getLoginFormTemplate = locals => (
    <>
      <div className="formField">{locals.inputs.email}</div>
    </>
  );


  const getFormSchema = () => t.struct(formSchema);
  const getFormOptions = () => ({
    template: getLoginFormTemplate,
    fields: {
      email: {
        label: 'Email',
        template: airvForm.templates.textbox,
        error: (val) => {
          if (Utils.isUndefinedOrNullOrEmpty(val)) {
            return 'Email Id is required';
          }
          return 'Invalid Email Id';
        },
        config: {
          addonBefore: <i className="icon-feather-mail" />,
        },
        attrs: {
          autoFocus: 'autofocus',
          placeholder: 'Enter Email Id',
        },
        type: 'email',
      },
    },
  });

  const submit = () => {
    setIsSubmitted(true);
    const { errors } = passForm.current.validate();
    if (!Utils.isEmptyList(errors)) {
      return;
    }
    const formData = Utils.deepCopy(passFormValue);
    sendEmailToResetPass(formData);
  };

  document.onkeydown = function () {
    if (window.event.keyCode === 13) {
      submit();
    }
  };

  return (
    <div className="uk-height-viewport uk-flex uk-flex-middle loginWrapper">
      <div className="uk-width-2-3@m uk-width-1-2@s m-auto rounded">
        <div className="uk-child-width-1-2@m -collapse bg-gradient-warning uk-grid">
          <div className="uk-margin-auto-vertical uk-text-center uk-animation-scale-up p-3 uk-light">
            <img src="assets/images/logo-light-icon.png" width="45" alt="" />
            <h1 className="mb-4 mt-2"> Airvting</h1>
            <p>The Place You can Share Your Videos. </p>
          </div>
          <div className="uk-card-default p-6">
            <div className="my-4 uk-text-center">
              <h2 className="mb-0"> Welcome back</h2>
              <p className="my-2">Login to manage your account.</p>
            </div>
            <t.form.Form ref={passForm} type={getFormSchema()} value={passFormValue} options={getFormOptions()} onChange={onChange} />
            <div className="mt-4 uk-flex-middle -small uk-grid">
              <div className="uk-width-expand@s">
                <p>
                  <span onClick={() => setAction({ action: 1 })} role="button" tabIndex={0} className="actionPointer">
                    Sign In
                  </span>
                  ,
                  <span onClick={() => setAction({ action: 2 })} role="button" tabIndex={0} className="actionPointer">
                    {' '}
                    {' '}
                    Sign Up
                  </span>
                </p>
              </div>
              <div className="uk-width-auto@s">
                <span className="button warning" onClick={submit} role="button" tabIndex={0}>
                  Submit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setAction: PropTypes.func.isRequired,
  sendEmailToResetPass: PropTypes.func.isRequired,
};

export default memo(Login);
