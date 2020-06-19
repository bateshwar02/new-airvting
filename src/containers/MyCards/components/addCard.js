/**
 *
 * Add Card
 *
 */

import React, {
  memo, useRef, useState, useEffect
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import t from 'tcomb-form';
import airvForm from '../../../components/form';
import * as Actions from '../actions';
import Utils from '../../../utils/common';

function Addcard({ addCards, inAddCradProcess, cardDetails }) {
  const cardForm = useRef(null);
  const cardFormData = {};

  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(cardDetails)) {
      const { paymentDetail } = cardDetails;
      cardFormData.defaultPaymentMethod = paymentDetail[0].defaultPaymentMethod;
      cardFormData.cardType = paymentDetail[0].cardType;
      cardFormData.last4 = paymentDetail[0].last4;
      cardFormData.expiryDate = paymentDetail[0].expiryDate;
      cardFormData.csv = paymentDetail[0].csv;
    }
  }, [cardDetails]);

  const [cardFormValue, setCardsForm] = useState(cardFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChange = (formValue) => {
    if (isSubmitted) {
      cardForm.current.validate();
    }
    setCardsForm(formValue);
  };

  const formSchema = {
    cardType: t.String, defaultPaymentMethod: t.Boolean, last4: airvForm.refinements.card, expiryDate: t.Number, csv: airvForm.refinements.csv,
  };

  const getLoginFormTemplate = locals => (
    <>
      <div className="formField">{locals.inputs.last4}</div>
      <div className="formField">{locals.inputs.expiryDate}</div>
      <div className="formField">{locals.inputs.csv}</div>
      <div className="formField">{locals.inputs.cardType}</div>
      <div className="formField">{locals.inputs.defaultPaymentMethod}</div>
    </>
  );


  const getFormSchema = () => t.struct(formSchema);
  const getFormOptions = () => ({
    template: getLoginFormTemplate,
    fields: {
      last4: {
        label: 'Enter Card Number',
        template: airvForm.templates.textbox,
        error: 'Card Number is Required.',
        config: {
          addonBefore: <i className="icon-feather-credit-card" />,
        },
        attrs: {
          autoFocus: 'autofocus',
          placeholder: 'Enter card number',
          validateRegex: /^([a-zA-Z0-9_-]){0,16}$/,
        },
        type: 'number',
      },
      cardType: {
        label: 'Select Card Type',
        template: airvForm.templates.select,
        attrs: {
          simpleValue: true,
          clearable: true,
        },
        options: [{ label: 'Personal', value: 'personal' }, { label: 'Corporate', value: 'corporate' }],
        factory: t.form.Radio,
      },
      defaultPaymentMethod: {
        template: airvForm.templates.checkbox,
        nullOption: false,
        options: [{ text: 'Default Payment Method', value: true }],
        factory: t.form.Radio,
        error: () => 'Gender is required',
      },
      csv: {
        template: airvForm.templates.textbox,
        label: 'CSV',
        attrs: {
          validateRegex: /^([a-zA-Z0-9_-]){3}$/,
          placeholder: 'CSV',
        },
        error: 'CSV is Required',
      },
      expiryDate: {
        template: airvForm.templates.date,
        label: 'Card Expiry Date',
        attrs: {
          timeFormat: false,
          placeholder: 'Card Expiry Date',
          dateFormat: 'MM yyyy',
        },
        error: 'Expiry Date is required.',
      },
    },
  });

  const submit = () => {
    setIsSubmitted(true);
    const { errors } = cardForm.current.validate();
    if (!Utils.isEmptyList(errors)) {
      return;
    }
    const formData = Utils.deepCopy(cardFormValue);
    addCards(formData);
  };

  const getContent = () => (
    <div id="modal-close-default uk-modal">
      <div className="cardWrapper">
        <t.form.Form ref={cardForm} type={getFormSchema()} value={cardFormValue} options={getFormOptions()} onChange={onChange} />
      </div>
      <button type="button" className="btn-mycart-remove button default " onClick={submit}>Payment</button>
    </div>
  );

  return (
    <>
      {getContent()}
    </>
  );
}

Addcard.propTypes = {
  addCards: PropTypes.func.isRequired,
  inAddCradProcess: PropTypes.bool.isRequired,
  cardDetails: PropTypes.object.isRequired,
};

const mapStateToProps = ({ cards: { inAddCradProcess, cardDetails } }) => ({ inAddCradProcess, cardDetails });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Addcard);
