/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import airvForm from '../../../components/form';
import Utils from '../../../utils/common';

function Signup({ setAction, signUp }) {
  const signUpForm = useRef(null);
  const [signUpFormValue, setLoginForm] = useState({ gender: [0] });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChange = (formValue, element) => {
    if (isSubmitted) {
      signUpForm.current.validate();
    }
    const formDataValue = Utils.deepCopy(formValue);
    if (element.includes('gender') && formDataValue.gender.length > 1) {
      formDataValue.gender.shift();
    }
    setLoginForm(formDataValue);
  };

  const formSchema = {
    firstName: airvForm.refinements.name,
    lastName: airvForm.refinements.name,
    email: airvForm.refinements.email,
    username: t.String,
    phoneNumber: airvForm.refinements.mobile,
    password: airvForm.refinements.pass,
    birth: t.Number,
    gender: t.Array,
  };

  const getFormSchema = () => t.struct(formSchema);

  const getLoginFormTemplate = locals => (
    <>
      <div className="uk-form-group">{locals.inputs.firstName}</div>
      <div className="uk-form-group">{locals.inputs.lastName}</div>
      <div className="uk-form-group">{locals.inputs.email}</div>
      <div className="uk-form-group">{locals.inputs.username}</div>
      <div className="uk-form-group">{locals.inputs.phoneNumber}</div>
      <div className="uk-form-group">{locals.inputs.password}</div>
      <div className="uk-form-group">{locals.inputs.birth}</div>
      <div className="uk-form-group">{locals.inputs.gender}</div>
    </>
  );

  const getFormOptions = () => ({
    template: getLoginFormTemplate,
    fields: {
      firstName: {
        label: 'First Name',
        template: airvForm.templates.textbox,
        error: (val) => {
          if (Utils.isUndefinedOrNullOrEmpty(val)) {
            return 'Name is required';
          }
          return 'Invalid Name';
        },
        config: {
          addonBefore: <i className="icon-feather-user" />,
        },
        attrs: {
          autoFocus: 'autofocus',
          placeholder: 'Enter Name',
        },
      },
      lastName: {
        label: 'Last Name',
        template: airvForm.templates.textbox,
        error: (val) => {
          if (Utils.isUndefinedOrNullOrEmpty(val)) {
            return 'Last Name is required';
          }
          return 'Invalid Last Name';
        },
        config: {
          addonBefore: <i className="icon-feather-user" />,
        },
        attrs: {
          placeholder: 'Enter Last Name',
        },
      },
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
          placeholder: 'Enter Email Id',
        },
      },
      username: {
        label: 'User Name',
        template: airvForm.templates.textbox,
        error: () => 'User Name is required',
        config: {
          addonBefore: <i className="icon-feather-user" />,
        },
      },
      phoneNumber: {
        label: 'Phone Number',
        template: airvForm.templates.textbox,
        error: (val) => {
          if (Utils.isUndefinedOrNullOrEmpty(val)) {
            return 'Phone number is required';
          }
          return 'Invalid Phone number';
        },
        config: {
          addonBefore: '+91',
        },
        attrs: {
          validateRegex: /^(\d{1}){0,10}$/,
        },
        type: 'text',
      },
      password: {
        label: 'Password',
        template: airvForm.templates.textbox,
        attrs: {
          placeholder: 'Enter Password',
        },
        config: {
          addonBefore: <i className="icon-feather-lock" />,
        },
        error: (val) => {
          if (Utils.isUndefinedOrNullOrEmpty(val)) {
            return 'Password is required';
          }
          return 'Invalid Password';
        },
        type: 'password',
      },
      birth: {
        template: airvForm.templates.date,
        label: 'Date Of Birth',
        attrs: {
          timeFormat: false,
          placeholder: 'Date Of Birth',
          dateFormat: 'dd MMM yyyy',
          isValidDate(current) {
            const currentDate = new Date();
            return current.getTime() <= currentDate.getTime();
          },
        },
        transformer: airvForm.transformers.dateTransformer,
        error: (val) => {
          if (Utils.isUndefinedOrNullOrEmpty(val)) {
            return 'Date Of Birth is required';
          }
          return '';
        },
      },
      gender: {
        template: airvForm.templates.checkbox,
        label: 'Gender',
        nullOption: false,
        options: [{ text: 'Male', value: 0 }, { text: 'Female', value: 1 }],
        factory: t.form.Radio,
        error: () => 'Gender is required',
      },
    },
  });


  const submit = () => {
    setIsSubmitted(true);
    const { errors } = signUpForm.current.validate();
    if (!Utils.isEmptyList(errors)) {
      return;
    }
    const formData = Utils.deepCopy(signUpFormValue);
    const { birth, gender } = formData;
    formData.birth = Utils.formatDate(birth, 'dd/mm/yyyy');
    // eslint-disable-next-line prefer-destructuring
    formData.gender = gender[0];
    signUp(formData);
  };
  return (
    <div className=" uk-height-viewport uk-flex uk-flex-middle loginWrapper">
      <div className="uk-width-2-3@m uk-width-1-2@s m-auto rounded">
        <div className="uk-child-width-1-2@m uk-grid-collapse bg-gradient-warning uk-grid">
          <div className="uk-margin-auto-vertical uk-text-center uk-animation-scale-up p-3 uk-light">
            <img src="assets/images/logo-light-icon.png" width="45" alt="" />
            <h1 className="mb-4 mt-2"> Airvting</h1>
            <p>The Place You can Share Your Videos. </p>
          </div>
          <div className="uk-card-default p-6">
            <div className="my-4 uk-text-center">
              <h3 className="mb-0">Create new Account</h3>
              <p className="my-2">Fill blank to create new account.</p>
            </div>
            <t.form.Form ref={signUpForm} type={getFormSchema()} value={signUpFormValue} options={getFormOptions()} onChange={onChange} />
            <div className="mt-4 uk-flex-middle uk-grid-small  uk-grid">
              <div className="uk-width-expand@s">
                <p>
                  {' '}
                  Do you have account
                  {' '}
                  <span onClick={() => setAction({ action: 1 })} role="button" tabIndex={0} className="actionPointer">
                    Sign in
                  </span>
                </p>
              </div>
              <div className="uk-width-auto@s">
                <span className="button warning" onClick={submit} role="button" tabIndex={0}>
                  Get Started
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Signup.propTypes = {
  setAction: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

export default memo(Signup);
