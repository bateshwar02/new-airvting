/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import airvForm from '../../components/form';
import Utils from '../../utils/common';

function ContactUs({ contactForm, contactUsForm, onChange }) {
  const contactUsFormTemplate = locals => (
    <>
      <div className="input-with-action">{locals.inputs.name}</div>
      <div className="input-with-action">{locals.inputs.email}</div>
      <div className="input-with-action">{locals.inputs.message}</div>
    </>
  );

  const getFormSchema = () => t.struct({ name: airvForm.refinements.name, email: airvForm.refinements.email, message: t.String });
  const getFormOptions = () => ({
    template: contactUsFormTemplate,
    fields: {
      name: {
        label: 'Name',
        template: airvForm.templates.textbox,
        error: 'Name field is required.',
        config: {
          addonBefore: <i className="icon-feather-user" />,
        },
        type: 'text',
      },
      email: {
        label: 'Email',
        template: airvForm.templates.textbox,
        attrs: {
          placeholder: 'Enter Email Id',
        },
        config: {
          addonBefore: <i className="icon-feather-mail" />,
        },
        error: (val) => {
          if (Utils.isUndefinedOrNullOrEmpty(val)) {
            return 'Email Id is required';
          }
          return 'Invalid Email Id';
        },
        type: 'email',
      },
      message: {
        template: airvForm.templates.textbox,
        label: 'Message',
        attrs: {
          placeholder: 'Enter Your Message.',
        },
        type: 'textarea',
        error: 'Please enter your message',
      },
      error: (val) => {
        if (Utils.isUndefinedOrNullOrEmpty(val)) {
          return 'Message Field is required';
        }
        return '';
      },
    },
  });

  return (
    <div className="pageWrapper">
      <t.form.Form ref={contactForm} type={getFormSchema()} value={contactUsForm} options={getFormOptions()} onChange={onChange} />
    </div>
  );
}

ContactUs.propTypes = {
  onChange: PropTypes.func.isRequired,
  contactForm: PropTypes.object.isRequired,
  contactUsForm: PropTypes.object.isRequired,
};

export default ContactUs;
