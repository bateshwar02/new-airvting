/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  memo, useRef, useState, useEffect
} from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import airvForm from '../../components/form';
import Utils from '../../utils/common';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import * as Actions from './actions';
import Loader from '../../components/Loader';
import Navigation from '../../utils/navigation';
import './index.css';

function ContactUs({ contactUs, userData, inProcess }) {
  const customData = {};

  const contactForm = useRef(null);
  const [contactUsForm, setContactUsForm] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!Utils.isUndefinedOrNullOrEmptyObject(userData)) {
      const { userDetail } = userData;
      customData.name = userDetail.displayName;
      customData.email = userDetail.email;
      setContactUsForm(customData);
    }
  }, [userData]);

  const onChange = (formValue) => {
    setContactUsForm(formValue);
    if (isSubmitted) {
      contactForm.current.validate();
    }
  };

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


  const cancelAction = () => {
    Navigation.push('sh/airvtingweb');
  };

  const submit = () => {
    setIsSubmitted(true);
    const { errors } = contactForm.current.validate();
    if (!Utils.isEmptyList(errors)) {
      return;
    }
    contactUs(contactUsForm);
  };

  const getContent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <div className="mt-lg-11 container-small">
          <div className="text-center my-4">
            <h6 className="uk-heading-line text-center">
              <span className="text">Get help, support and troubleshoot your service or get int touch with us.</span>
            </h6>
          </div>
          <div className="pageWrapper">
            <t.form.Form ref={contactForm} type={getFormSchema()} value={contactUsForm} options={getFormOptions()} onChange={onChange} />
          </div>
          <div className="uk-flex uk-flex-right p-4">
            <button type="button" className="button soft-warning mr-2" onClick={cancelAction}>
              Cancle
            </button>
            <button type="button" className="button warning" onClick={submit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Contact-us</title>
        <meta name="description" content="Description of Contact us" />
      </Helmet>
      <Header />
      <Sidebar />
      {getContent()}
      <Loader inProcess={inProcess} />
    </>
  );
}

ContactUs.propTypes = {
  contactUs: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  inProcess: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ contact: { inProcess }, userDetails: { userData } }) => ({ userData, inProcess });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ContactUs);
