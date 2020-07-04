/**
 *
 * Featured
 *
 */

import React, {
  memo, useRef, useState, useEffect
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import t from 'tcomb-form';
import Utils from '../../utils/common';
import * as Actions from './actions';
import airvForm from '../../components/form';
import Services from '../Message/api';
import Modal from '../../components/Modal';


export function AddPost({
  inProcess, addPost, catOption, getCategoryOp, isAddPost
}) {
  const addPostRef = useRef(null);

  const [postFormData, setProductFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyList(catOption)) {
      getCategoryOp();
    }
  }, []);

  const onChange = (formValue) => {
    if (isSubmitted) {
      addPostRef.current.validate();
    }
    setProductFormData(formValue);
  };

  const formSchema = {
    categories: t.Object,
    title: t.String,
    type: t.String,
    tagUsers: t.Array
  };

  const getUserData = (input, callback) => {
    if (Utils.isUndefinedOrNullOrEmpty(input)) {
      callback(null, []);
      return;
    }
    const query = input;
    Services.searchUser(query)
      .then((response) => {
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

  const getLoginFormTemplate = locals => (
    <>
      <div className="formWrap">
        {locals.inputs.type}
      </div>
      <div className="formWrap">
        {locals.inputs.title}
      </div>
      <div className="formWrap">
        {locals.inputs.categories}
      </div>
      <div className="formWrap">
        {locals.inputs.tagUsers}
      </div>
    </>
  );

  const getFormSchema = () => t.struct(formSchema);

  const getFormOptions = () => ({
    template: getLoginFormTemplate,
    fields: {
      type: {
        label: 'Type',
        template: airvForm.templates.textbox,
        error: 'Type is required',
        type: 'text'
      },
      title: {
        label: 'Title',
        template: airvForm.templates.textbox,
        attrs: {
          placeholder: 'Title',
        },
        error: 'Title is required',
      },
      categories: {
        label: 'Categories',
        template: airvForm.templates.select,
        attrs: {
          placeholder: 'Select Category Name',
          simpleValue: true,
          clearable: true,
        },
        options: catOption,
        error: 'Product Categories is required',
        factory: t.form.Select,
      },

      tagUsers: {
        template: airvForm.templates.select,
        label: 'Tag Users',
        attrs: {
          placeholder: 'Search user',
          simpleValue: true,
          clearable: true,
          multiSelect: true,
          loadOptions: (input, callback) => {
            if (input.length > 2) {
              getUserData(input, callback);
            }
          },
        },
        options: [],
        error: 'To field is required',
        factory: t.form.Select,
      },

      //   featuredImage: {
      //     label: 'Type',
      //     template: airvForm.templates.textbox,
      //     error: 'Type is required',
      //     type: 'text'
      //   },
      //   mediaUrl: {
      //     label: 'Type',
      //     template: airvForm.templates.textbox,
      //     error: 'Type is required',
      //     type: 'text'
      //   },

    },
  });

  const submit = () => {
    setIsSubmitted(true);
    const { errors } = addPostRef.current.validate();
    if (!Utils.isEmptyList(errors)) {
      return;
    }
    addPost(postFormData);
  };

  const getContent = () => (
    <div className="addPostWrapper">
      <div className="formWrapper">
        <t.form.Form ref={addPostRef} type={getFormSchema()} value={postFormData} options={getFormOptions()} onChange={onChange} />
      </div>
      <div className="uk-flex uk-flex-right p-4">
        <button type="button" className="button warning" onClick={submit}>
          Add Post
          {inProcess && (
            <div className="loaderWrapper">
              <div className="customLoader" />
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {isAddPost && (
      <Modal
        onCancel={() => {}}
        modalContent={getContent()}
        modalHeader={<h2 className="uk-modal-title">Add Post</h2>}
        hasFooter={false}
      />
      )}
    </>
  );
}

AddPost.propTypes = {
  inProcess: PropTypes.bool.isRequired,
  addPost: PropTypes.func.isRequired,
  catOption: PropTypes.array.isRequired,
  getCategoryOp: PropTypes.func.isRequired,
  isAddPost: PropTypes.bool.isRequired,
};


const mapStateToProps = ({ live: { inProcess, catOption, isAddPost } }) => ({ inProcess, catOption, isAddPost });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddPost);
