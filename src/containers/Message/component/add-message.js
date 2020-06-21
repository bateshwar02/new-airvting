/**
 *
 * MyChannel
 *
 */

import React, { memo, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import t from 'tcomb-form';
import * as Actions from '../actions';
import Utils from '../../../utils/common';
import airvForm from '../../../components/form';
import Services from '../api';

export function Add() {
  const msgForm = useRef(null);
  const [addMsg, setAddMes] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChange = (formValue) => {
    if (isSubmitted) {
      msgForm.current.validate();
    }
    setAddMes(formValue);
  };

  const formSchema = { to: t.String, title: t.String, message: t.String };

  const addMsgTemplate = locals => (
    <>
      <div className="add-message">{locals.inputs.to}</div>
      <div className="add-message">{locals.inputs.title}</div>
      <div className="add-message">{locals.inputs.message}</div>
    </>
  );

  const getUserData = (input, callback) => {
    if (Utils.isUndefinedOrNullOrEmpty(input)) {
      callback(null, []);
      return;
    }
    const query = input;
    Services.searchUser(query)
      .then((response) => {
        console.log('response ========= ', response);
        if (Utils.isUndefinedOrNullOrEmptyList(response.data.userDetail)) {
          callback([]);
        }
        const options = response.data.userDetail.map(item => ({ value: item._id, label: item.displayName }));
        callback(options);
      })
      .catch((error) => {
        callback(error, null);
      });
  };


  const getFormSchema = () => t.struct(formSchema);
  const getFormOptions = () => ({
    template: addMsgTemplate,
    fields: {
      to: {
        template: airvForm.templates.select,
        label: 'To',
        attrs: {
          placeholder: 'Search user',
          simpleValue: true,
          clearable: true,
          autoFocus: 'autofocus',
          loadOptions: (input, callback) => {
            if (input.length < 2) {
              getUserData(input, callback);
            }
          },
        },
        options: [],
        error: 'To field is required',
        factory: t.form.Select,
      },
      title: {
        label: 'Title',
        template: airvForm.templates.textbox,
        error: 'Title field is required',
        type: 'test',
      },
      message: {
        template: airvForm.templates.textbox,
        label: 'Message',
        attrs: {
          placeholder: 'Enter Your Message her...',
        },
        type: 'textarea',
        error: 'Please enter your query',
      },
    }
  });

  const submit = () => {
    setIsSubmitted(true);
    const { errors } = msgForm.current.validate();
    if (!Utils.isEmptyList(errors)) {
      return;
    }
    const formData = Utils.deepCopy(addMsg);
    console.log('formData ==== ', formData);
  };

  return (
    <div className="add-message-form">
      <t.form.Form ref={msgForm} type={getFormSchema()} value={addMsg} options={getFormOptions()} onChange={onChange} />
      <div className="">
        <button className="button default" type="button" onClick={submit}>Add Message</button>
      </div>
    </div>
  );
}

Add.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = ({ myChannel }) => ({ myChannel });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Add);
