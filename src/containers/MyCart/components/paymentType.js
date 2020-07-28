import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import airvForm from '../../../components/form';
import * as Actions from '../actions';
import Utils from '../../../utils/common';

function paymentType({
  updatePaymentMethod, inProcess, userData, updateStepAction
}) {
  const addressFormRef = useRef(null);

  const [addressForm, setAddressForm] = useState({});
  const [isSelectMethod, setIsSelectMethod] = useState(false);

  const submit = () => {
    const { userDetail: { urlCreatePaypalAccount, urlCreateStripeAccount } } = userData;
    updatePaymentMethod(addressForm.payment_mode[0]);
    updateStepAction(3);
    let paymentUrl = urlCreatePaypalAccount;
    if (addressForm.payment_mode[0] === 'Stripe') {
      paymentUrl = urlCreateStripeAccount;
    }
    window.open(paymentUrl, '_blank');
  };

  const onChange = (formValue, element) => {
    const formDataValue = Utils.deepCopy(formValue);
    if (element.includes('payment_mode') && formDataValue.payment_mode.length > 1) {
      formDataValue.payment_mode.shift();
      formValue.payment_mode = formDataValue.payment_mode;
    }
    setAddressForm(formValue);
    if (formValue.payment_mode[0] === 'COD') {
      updatePaymentMethod(formValue.payment_mode[0]);
      updateStepAction(3);
      return;
    }
    setIsSelectMethod(true);
  };

  const formSchema = {
    payment_mode: t.Object
  };

  const getLoginFormTemplate = locals => (
    <>
      <div className="uk-form-group fieldWrap">{locals.inputs.payment_mode}</div>
    </>
  );


  const getFormSchema = () => t.struct(formSchema);
  const getFormOptions = () => ({
    template: getLoginFormTemplate,
    fields: {
      payment_mode: {
        label: 'Choose your payment type',
        template: airvForm.templates.checkbox,
        nullOption: false,
        options: [{ text: 'COD', value: 'COD' }, { text: 'Stripe', value: 'Stripe' }, { text: 'Paypal', value: 'Paypal' }],
        factory: t.form.Radio,
      },
    },
  });

  const getFormData = () => (
    <>
      <div className="formWrapper">
        <t.form.Form ref={addressFormRef} type={getFormSchema()} value={addressForm} options={getFormOptions()} onChange={onChange} />
      </div>
      {
          isSelectMethod && (
            <div className="buttonWrapper">
              <button type="button" className="button warning" onClick={submit}>
                Connect
                {inProcess && (
                <div className="loaderWrapper">
                  <div className="customLoader" />
                </div>
                )}
              </button>
            </div>
          )
      }
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

paymentType.propTypes = {
  inProcess: PropTypes.bool.isRequired,
  updatePaymentMethod: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  updateStepAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ carts: { cartData, inProcess }, userDetails: { userData } }) => ({ cartData, inProcess, userData });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect
)(paymentType);
