/**
 *
 * Add Card
 *
 */

import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import t from 'tcomb-form';
import airvForm from '../../../components/form';
import * as Actions from '../actions';
import Utils from '../../../utils/common';

function Addcard({addCards, inAddCradProcess}) {
  const cardForm = useRef(null);
  const [cardFormValue, setCardsForm] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChange = (formValue) => {
    if (isSubmitted) {
        cardForm.current.validate();
    }
    setCardsForm(formValue);
  };

  const formSchema = { email: airvForm.refinements.email, password: airvForm.refinements.pass };

  const getLoginFormTemplate = locals => (
    <>
      <div className="formField">{locals.inputs.email}</div>
      <div className="formField">{locals.inputs.password}</div>
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
    <div className="uk-modal-dialog uk-modal-body">
      <button className="uk-modal-close-default uk-close" type="button"  />
      <h2 className="uk-modal-title">Cart fill</h2>
      <t.form.Form ref={cardForm} type={getFormSchema()} value={cardFormValue} options={getFormOptions()} onChange={onChange} />
      <form className="uk-form card-box">
        <fieldset className="message-filedset">

          <div className="uk-form-row">
            <label>
              Fill Cart No
              <input type="text" placeholder=" 1234 1234 1234 1234" />
            </label>
          </div>
        </fieldset>
        <fieldset className="message-filedset">

          <div className="uk-form-row">
            <label>
              Expiration
              <input type="text" placeholder=" MM / yyyy" />
            </label>
          </div>

        </fieldset>
        <fieldset className="message-filedset">

          <div className="uk-form-row">
            <label>
              CVC Code
              <input type="text" placeholder=" CVC" />
            </label>
          </div>

        </fieldset>
        <fieldset className="message-filedset">

          <div className="uk-form-row">
            <label>
              Countery
              <select>
                <option>Select country</option>
                <option>Select country</option>
                <option>Select country</option>
              </select>

            </label>
          </div>

        </fieldset>
        <fieldset className="message-filedset">

          <div className="uk-form-row">
            <label>
              Postal code
              <input type="text" placeholder=" 12345" />
            </label>
          </div>

        </fieldset>

        <fieldset className="message-filedset">

          <div className="uk-form-row">
            <input type="checkbox" style={{ width: '20px' }} />
            {' '}
            Save my cart for future purchases
          </div>

        </fieldset>
        <button className="btn-mycart-remove button default ">Payment</button>
      </form>
    </div>
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
    inAddCradProcess:PropTypes.bool.isRequired, 
};

const mapStateToProps = ({ cards:{inAddCradProcess} }) => ({ inAddCradProcess });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Addcard);