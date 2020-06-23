/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * About
 *
 */

import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import t from 'tcomb-form';
import airvForm from '../../../components/form';

import Utils from '../../../utils/common';
import * as Actions from '../actions';
// import Navigation from '../../../utils/navigation';

function General({ userData, updateUser, inProcess }) {
  const { userDetail } = userData;
  const userFormRef = useRef(null);
  const defaultFormValue = {};
  if (!Utils.isUndefinedOrNullOrEmptyObject(userDetail)) {
    const date = new Date(userDetail.createdAt);
    const ticks = date.getTime();
    defaultFormValue.firstName = userDetail.firstName;
    defaultFormValue.lastName = userDetail.lastName;
    defaultFormValue.email = userDetail.email;
    defaultFormValue.gender = [userDetail.gender];
    defaultFormValue.birth = ticks;
  }
  const [userFormData, setUserFormData] = useState(defaultFormValue);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChange = (formValue, element) => {
    if (isSubmitted) {
      userFormRef.current.validate();
    }
    const formDataValue = Utils.deepCopy(formValue);
    if (element.includes('gender') && formDataValue.gender.length > 1) {
      formDataValue.gender.shift();
      formValue.gender = formDataValue.gender;
    }
    setUserFormData(formValue);
  };

  const formSchema = {
    firstName: airvForm.refinements.name,
    lastName: airvForm.refinements.name,
    email: airvForm.refinements.email,
    description: t.String,
    location: t.String,
    birth: t.Number,
    gender: t.Array,
    coverImage: t.Object,
    featuredImage: t.Object,
  };

  const getLoginFormTemplate = locals => (
    <>
      <div className="uk-form-group fieldWrap">{locals.inputs.firstName}</div>
      <div className="uk-form-group fieldWrap">{locals.inputs.lastName}</div>
      <div className="uk-form-group fieldWrap">{locals.inputs.email}</div>
      <div className="uk-form-group fieldWrap">{locals.inputs.birth}</div>
      <div className="uk-form-group fieldWrap">{locals.inputs.coverImage}</div>
      <div className="uk-form-group fieldWrap">{locals.inputs.featuredImage}</div>
      <div className="uk-form-group fieldWrap">{locals.inputs.location}</div>
      <div className="uk-form-group fieldWrap">{locals.inputs.description}</div>
      <div className="uk-form-group fieldWrap">{locals.inputs.gender}</div>
    </>
  );


  const getFormSchema = () => t.struct(formSchema);
  const getFormOptions = () => ({
    template: getLoginFormTemplate,
    fields: {
      firstName: {
        label: 'First Name',
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
      lastName: {
        label: 'Last Name',
        template: airvForm.templates.textbox,
        error: (val) => {
          if (Utils.isUndefinedOrNullOrEmpty(val)) {
            return 'Last Name is required';
          }
          return 'Invalid Last Name';
        },
        config: {
          addonBefore: <i className="icon-feather-user" />,
        },
        attrs: {
          placeholder: 'Enter Last Name',
        },
      },
      gender: {
        template: airvForm.templates.checkbox,
        label: 'Gender',
        // nullOption: false,
        options: [{ text: 'Male', value: 0 }, { text: 'Female', value: 1 }],
        factory: t.form.Radio,
        error: () => 'Gender is required',
      },
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
          placeholder: 'Enter Email Id',
        },
      },
      description: {
        label: 'Description',
        template: airvForm.templates.textbox,
        error: () => 'Description is required',
        type: 'textarea'
      },
      coverImage: {
        label: 'Cover Image',
        template: airvForm.templates.textbox,
        error: 'Cover Image is required',
        type: 'file'
      },
      featuredImage: {
        label: 'Featured Image',
        template: airvForm.templates.textbox,
        error: 'Featured Image is required',
        type: 'file'
      },
      birth: {
        template: airvForm.templates.date,
        label: 'Date Of Birth',
        attrs: {
          timeFormat: false,
          placeholder: 'Date Of Birth',
          dateFormat: 'dd MMM yyyy',
        },
        transformer: airvForm.transformers.dateTransformer,
        error: (val) => {
          if (Utils.isUndefinedOrNullOrEmpty(val)) {
            return 'Date Of Birth is required';
          }
          return '';
        },
      },
      location: {
        label: 'Location',
        template: airvForm.templates.textbox,
        error: () => 'Location is required',
        type: 'textarea'
      },
    },
  });

  const submit = () => {
    setIsSubmitted(true);
    const { errors } = userFormRef.current.validate();
    if (!Utils.isEmptyList(errors)) {
      return;
    }
    const {
      firstName, lastName, email, description, coverImage, featuredImage, location, birth, gender
    } = userFormData;

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('coverImage', coverImage);
    formData.append('featuredImage', featuredImage);
    formData.append('location', location);
    formData.append('birth', Utils.formatDate(birth, 'dd/mm/yyyy'));
    formData.append('gender', gender[0]);

    if (!Utils.isUndefinedOrNullOrEmptyObject(userDetail)) {
      updateUser(formData, userDetail._id);
    }
  };

  return (
    <>
      <div className="p-3">
        <h5 className="mb-0"> User Profile Info </h5>
      </div>
      <hr className="m-0" />
      <div className="uk-child-width-1-2@s uk-grid-small p-4 uk-grid">
        <t.form.Form ref={userFormRef} type={getFormSchema()} value={userFormData} options={getFormOptions()} onChange={onChange} />
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

General.propTypes = {
  userData: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
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
)(General);
