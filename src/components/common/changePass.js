/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  memo, useRef, useState
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import t from 'tcomb-form';
import airvForm from '../form';
import Utils from '../../utils/common';
import * as Actions from '../../containers/Settings/actions';

function Password({
  forgatePassword, inProcess, match
}) {
  const passRef = useRef(null);
  const [passFormData, setPassFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPassSame, setPassAction] = useState(false);


  const onChange = (formValue, element) => {
    if (isSubmitted) {
      passRef.current.validate();
      if (element.includes('confirm_password') && formValue.confirm_password === formValue.password) {
        setPassAction(false);
      }
    }
    setPassFormData(formValue);
  };

  const formSchema = { confirm_password: t.String, password: airvForm.refinements.pass };

  const formTemplate = locals => (
    <>
      <div className="formField">{locals.inputs.password}</div>
      <div className="formField">
        {locals.inputs.confirm_password}
        {isPassSame && <span className="help-block error-block">Confirm Password should be same.</span>}
      </div>
    </>
  );

  const getFormSchema = () => t.struct(formSchema);
  const getFormOptions = () => ({
    template: formTemplate,
    fields: {
      password: {
        label: 'Password',
        template: airvForm.templates.textbox,
        attrs: {
          placeholder: 'Enter Password',
          autoFocus: 'autofocus',
        },
        config: {
          addonBefore: <i className="icon-feather-lock" />,
        },
        error: (val) => {
          if (Utils.isUndefinedOrNullOrEmpty(val)) {
            return 'Password is required';
          }
          return 'Invalid Password (Password should be aplphanumeric with special charector.)';
        },
        type: 'password',
      },
      confirm_password: {
        label: 'Confirm Password',
        template: airvForm.templates.textbox,
        attrs: {
          placeholder: 'Enter Confirm Password',
        },
        config: {
          addonBefore: <i className="icon-feather-lock" />,
        },
        error: 'Confirm Password is required',
        type: 'password',
      },
    }
  });

  const submit = () => {
    setIsSubmitted(true);
    const { errors } = passRef.current.validate();
    if (!Utils.isEmptyList(errors)) {
      return;
    }
    const formData = Utils.deepCopy(passFormData);
    if (formData.confirm_password !== formData.password) {
      setPassAction(true);
      return;
    }
    const { token } = match.params;
    formData.token = token;
    forgatePassword(formData);
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
              <h3 className="my-2">Reset Password.</h3>
            </div>
            <t.form.Form ref={passRef} type={getFormSchema()} value={passFormData} options={getFormOptions()} onChange={onChange} />
            <div className="mt-4 uk-flex-middle -small uk-grid">
              <div className="uk-width-expand@s">  </div>
              <div className="uk-width-auto@s">
                <span className="button warning" onClick={submit} role="button" tabIndex={0}>
                  Reset Password
                  {inProcess && (
                  <div className="loaderWrapper">
                    <div className="customLoader" />
                  </div>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Password.propTypes = {
  forgatePassword: PropTypes.func.isRequired,
  inProcess: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
};


const mapStateToProps = ({ setting: { inProcess }, userDetails: { userData } }) => ({ userData, inProcess });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Password);
