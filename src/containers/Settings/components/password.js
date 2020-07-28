import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import t from 'tcomb-form';
import airvForm from '../../../components/form';
import Utils from '../../../utils/common';
import * as Actions from '../actions';

function Password({ updatePassword, inProcess }) {
  const passRef = useRef(null);
  const [passFormData, setPassFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChange = (formValue) => {
    if (isSubmitted) {
      passRef.current.validate();
    }
    setPassFormData(formValue);
  };

  const formSchema = { old_password: airvForm.refinements.pass, password: airvForm.refinements.pass };

  const formTemplate = locals => (
    <>
      <div className="uk-form-group fieldWrap">{locals.inputs.old_password}</div>
      <div className="uk-form-group fieldWrap">{locals.inputs.password}</div>
    </>
  );

  const getFormSchema = () => t.struct(formSchema);
  const getFormOptions = () => ({
    template: formTemplate,
    fields: {
      old_password: {
        label: 'Old Password',
        template: airvForm.templates.textbox,
        attrs: {
          placeholder: 'Enter Old Password',
        },
        config: {
          addonBefore: <i className="icon-feather-lock" />,
        },
        error: (val) => {
          if (Utils.isUndefinedOrNullOrEmpty(val)) {
            return 'Old Password is required';
          }
          return 'Invalid Password';
        },
        type: 'password',
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
    }
  });

  const submit = () => {
    setIsSubmitted(true);
    const { errors } = passRef.current.validate();
    if (!Utils.isEmptyList(errors)) {
      return;
    }
    passFormData.confirm_password = passFormData.password;
    updatePassword(passFormData);
  };

  return (
    <>
      <div className="p-3">
        <h5 className="mb-0"> Reset Password</h5>
      </div>
      <hr className="m-0" />
      <div className="uk-child-width-1-2@s uk-grid-small p-4 uk-grid">
        <t.form.Form ref={passRef} type={getFormSchema()} value={passFormData} options={getFormOptions()} onChange={onChange} />
      </div>
      <div className="uk-flex uk-flex-right p-4">
        <button type="button" className="button soft-warning mr-2">
          Cancle
        </button>
        <button type="button" className="button warning" onClick={submit}>
          Save Changes
          {inProcess && (
          <div className="loaderWrapper">
            <div className="customLoader" />
          </div>
          )}
        </button>
      </div>
    </>
  );
}

Password.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  inProcess: PropTypes.bool.isRequired,
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
