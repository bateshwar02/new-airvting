import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import airvForm from '../../../components/form';
import * as Actions from '../actions';
import Utils from '../../../utils/common';

function addAddress({
  inProcess, editAddress, selectedAddressData, editAction
}) {
  const addressFormRef = useRef(null);
  const defaultFormValue = {};

  if (!Utils.isUndefinedOrNullOrEmptyObject(selectedAddressData)) {
    defaultFormValue.full_name = selectedAddressData.full_name;
    defaultFormValue.mobile_number = selectedAddressData.mobile_number;
    defaultFormValue.state = selectedAddressData.state;
    defaultFormValue.city = selectedAddressData.city;
    defaultFormValue.postalCode = selectedAddressData.postalCode;
    defaultFormValue.country = selectedAddressData.country;
    defaultFormValue.street = selectedAddressData.street;
  }

  const [addressForm, setAddressForm] = useState(defaultFormValue);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChange = (formValue) => {
    if (isSubmitted) {
      addressFormRef.current.validate();
    }
    setAddressForm(formValue);
  };

  const formSchema = {
    full_name: t.String,
    mobile_number: airvForm.refinements.mobile,
    state: t.String,
    city: t.String,
    postalCode: t.String,
    country: t.String,
    street: t.String,
    is_default: t.maybe(t.Array),
  };

  const getLoginFormTemplate = locals => (
    <>
      <div className="uk-form-group fieldWrap">{locals.inputs.full_name}</div>
      <div className="uk-form-group fieldWrap">{locals.inputs.mobile_number}</div>
      <div className="uk-form-group fieldWrap">{locals.inputs.state}</div>
      <div className="uk-form-group fieldWrap">{locals.inputs.city}</div>
      <div className="uk-form-group fieldWrap">{locals.inputs.postalCode}</div>
      <div className="uk-form-group fieldWrap">{locals.inputs.country}</div>
      <div className="uk-form-group fieldWrap">{locals.inputs.street}</div>
      <div className="uk-form-group fieldWrap">{locals.inputs.is_default}</div>
    </>
  );


  const getFormSchema = () => t.struct(formSchema);
  const getFormOptions = () => ({
    template: getLoginFormTemplate,
    fields: {
      full_name: {
        label: 'Full Name',
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

      mobile_number: {
        label: 'Mobile',
        template: airvForm.templates.textbox,
        error: (val) => {
          if (Utils.isUndefinedOrNullOrEmpty(val)) {
            return 'Mobile number is required';
          }
          return 'Invalid Mobile number';
        },
        config: {
          addonBefore: '+91',
        },
        attrs: {
          validateRegex: /^(\d{1}){0,10}$/,
        },
        type: 'text',
      },
      state: {
        template: airvForm.templates.textbox,
        label: 'State',
        attrs: {
          placeholder: 'Enter City',
        },
        error: 'State is required',
        type: 'text'
      },
      city: {
        label: 'City',
        template: airvForm.templates.textbox,
        attrs: {
          placeholder: 'Enter City',
        },
        error: 'City is required',
        type: 'text'
      },
      postalCode: {
        label: 'Postal Code',
        template: airvForm.templates.textbox,
        attrs: {
          placeholder: 'Enter Postal Code',
        },
        error: 'Postal Code is required',
        type: 'text'
      },
      country: {
        label: 'Country',
        template: airvForm.templates.textbox,
        attrs: {
          placeholder: 'Enter Country',
        },
        error: 'Country is required',
        type: 'text'
      },
      street: {
        label: 'Street',
        template: airvForm.templates.textbox,
        attrs: {
          placeholder: 'Enter Street with house no..',
        },
        error: 'Street is required',
        type: 'textarea'
      },
      is_default: {
        template: airvForm.templates.checkbox,
        options: [{ text: 'Set Default Address', value: 1 }],
        factory: t.form.Radio,
      },
    },
  });

  const submit = () => {
    setIsSubmitted(true);
    const { errors } = addressFormRef.current.validate();
    if (!Utils.isEmptyList(errors)) {
      return;
    }
    const formData = Utils.deepCopy(addressForm);
    formData.is_default = false;
    if (!Utils.isUndefinedOrNullOrEmptyList(addressForm.is_default) && addressForm.is_default[0] === 1) {
      formData.is_default = true;
    }
    editAddress(formData, selectedAddressData._id);
  };

  const getFormData = () => (
    <>
      <div className="formWrapper">
        <t.form.Form ref={addressFormRef} type={getFormSchema()} value={addressForm} options={getFormOptions()} onChange={onChange} />
      </div>
      <div className="buttonWrapper">
        <button type="button" className="button soft-warning mr-2" onClick={() => editAction(false)}>
          Cancle
        </button>
        <button type="button" className="button warning" onClick={submit}>
          Update Address
          {inProcess && (
          <div className="loaderWrapper">
            <div className="customLoader" />
          </div>
          )}
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className="addAddressWrapper">
        {getFormData()}
      </div>
    </>
  );
}

addAddress.propTypes = {
  inProcess: PropTypes.bool.isRequired,
  editAddress: PropTypes.func.isRequired,
  selectedAddressData: PropTypes.object.isRequired,
  editAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  carts: {
    cartData, inProcess, selectedAddressData
  }
}) => ({
  cartData, inProcess, selectedAddressData
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect
)(addAddress);
