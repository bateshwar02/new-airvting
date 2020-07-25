/**
 *
 * Featured
 *
 */

import React, { memo, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import t from 'tcomb-form';
import Utils from '../../utils/common';
import * as Actions from './actions';
import airvForm from '../../components/form';
import Services from '../Message/api';
import Modal from '../../components/Modal';
import Navigation from '../../utils/navigation';

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postFormData: {
        title: '', postCategories: {}, discount: '', tagUsers: []
      },
      isSubmitted: false,
    };
  }

  componentDidMount() {
    const { catOption, getCategoryOp } = this.props;
    if (Utils.isUndefinedOrNullOrEmptyList(catOption)) {
      getCategoryOp();
    }
  }

  onChange = (formValue) => {
    const { isSubmitted } = this.state;

    this.setState({
      postFormData: formValue,
    }, () => {
      if (isSubmitted) {
        this.postForm.getValue();
      }
    });
  };

  getUserData = (input, callback) => {
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

  getLoginFormTemplate = locals => (
    <>
      <div className="formWrap">
        {locals.inputs.title}
      </div>
      <div className="formWrap">
        {locals.inputs.postCategories}
      </div>
      <div className="formWrap">{locals.inputs.discount}</div>
      <div className="formWrap">
        {locals.inputs.tagUsers}
      </div>
    </>
  );

  getFormSchema = () => {
    const formSchema = {
      postCategories: t.Object,
      title: t.String,
      tagUsers: t.maybe(t.Array),
      discount: t.String,
    };

    return t.struct(formSchema);
  }

  getFormOptions = () => {
    const { catOption } = this.props;
    return ({
      template: this.getLoginFormTemplate,
      fields: {
        title: {
          label: 'Title',
          template: airvForm.templates.textbox,
          attrs: {
            placeholder: 'Title',
          },
          error: 'Title is required',
        },
        postCategories: {
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
                this.getUserData(input, callback);
              }
            },
          },
          options: [],
          factory: t.form.Select,
        },

        discount: {
          label: 'Discount',
          template: airvForm.templates.textbox,
          error: 'Discount is required',
          type: 'text',
          attrs: {
            validateRegex: /^[0-9]{1,2}[:.,-]?$/,
            placeholder: 'Discount in %',
          },
        },
      },
    });
  }

  submit = () => {
    const { addPost } = this.props;
    const { postFormData } = this.state;

    const errors = this.postForm.getValue();
    this.setState({ isSubmitted: true });
    if (Utils.isUndefinedOrNullOrEmptyObject(errors)) {
      return;
    }

    const formData = Utils.deepCopy(postFormData);
    formData.type = 'stream';
    const userData = [];
    if (!Utils.isUndefinedOrNullOrEmptyList(formData.tagUsers)) {
      formData.tagUsers.forEach((item) => {
        userData.push({ userId: item.value, username: item.label });
      });
    }
    formData.postCategories = [{ categoryId: formData.postCategories.value, title: formData.postCategories.label }];
    formData.tagUsers = userData;
    formData.product = [{
      discount: `${formData.discount} %`,
      featuredImage: '',
    }];
    delete (formData.discount);
    console.log('formData ==== ', formData);
    addPost(formData);
  };

  getContent = () => {
    const { postFormData } = this.state;
    const { inProcess } = this.props;
    return (
      <div className="addPostWrapper">
        <div className="formWrapper">
          <t.form.Form
            ref={(el) => { this.postForm = el; }}
            type={this.getFormSchema()}
            options={this.getFormOptions()}
            value={postFormData}
            onChange={this.onChange}
          />
        </div>
        <div className="uk-flex uk-flex-right p-4">
          <button type="button" className="button warning" onClick={this.submit}>
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
  }

  render() {
    const { isAddPost } = this.props;
    return (
      <>
        {isAddPost && (
        <Modal
          onCancel={() => { Navigation.push('/sh/airvtingweb'); }}
          modalContent={this.getContent()}
          modalHeader={<h2 className="uk-modal-title">Add Post</h2>}
          hasFooter={false}
        />
        )}
      </>
    );
  }
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
