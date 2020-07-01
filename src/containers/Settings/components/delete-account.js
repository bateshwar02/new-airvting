import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import t from 'tcomb-form';
import Utils from '../../../utils/common';
import airvForm from '../../../components/form';
import * as Actions from '../actions';

function Delete({ deactivateAccount }) {
  const accRef = useRef(null);
  const [accFormData, setAccFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChange = (formValue) => {
    if (isSubmitted) {
      accRef.current.validate();
    }
    setAccFormData(formValue);
  };

  const formSchema = { reason: t.String };

  const formTemplate = locals => (
    <>
      <div className="uk-form-group fieldWrap">{locals.inputs.reason}</div>
    </>
  );

  const getFormSchema = () => t.struct(formSchema);
  const getFormOptions = () => ({
    template: formTemplate,
    fields: {
      reason: {
        label: 'Enter your Reason',
        template: airvForm.templates.textbox,
        attrs: {
          placeholder: 'Others...',
        },
        error: 'Field is required',
        type: 'textarea',
      },
    }
  });

  const submit = () => {
    setIsSubmitted(true);
    const { errors } = accRef.current.validate();
    if (!Utils.isEmptyList(errors)) {
      return;
    }
    deactivateAccount(accFormData);
  };

  return (
    <>
      <div className="p-3">
        <h5 className="mb-0">Delete Your Account</h5>
      </div>
      <hr className="m-0" />
      <div className="delete-account-hadding">
        <h5>Are you sure you want to delete Your account?</h5>
        <p>Please Let Us know the reason why you are leaving.</p>
      </div>
      <div className="uk-child-width-1@s uk-grid-small p-4 uk-grid">
        <t.form.Form ref={accRef} type={getFormSchema()} value={accFormData} options={getFormOptions()} onChange={onChange} />
      </div>
      <div className="uk-flex uk-flex-right p-4">
        <button type="button" className="button soft-warning mr-2">
          Cancle
        </button>
        <button type="button" className="button warning" onClick={submit}>
          Delete Account
        </button>
      </div>
    </>
  );
}

Delete.propTypes = {
  deactivateAccount: PropTypes.func.isRequired
};


const mapStateToProps = ({ userDetails: { userData } }) => ({ userData });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Delete);
