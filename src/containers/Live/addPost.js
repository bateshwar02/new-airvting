/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable react/no-unused-state */
/**
 *
 * Featured
 *
 */
import cookie from 'cookies-js';
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
      postFormData: {},
      isSubmitted: false,
    };
  }


  componentDidMount() {
    const {
      catOption, getCategoryOp, porductData, getProductList
    } = this.props;

    if (Utils.isUndefinedOrNullOrEmptyList(catOption)) {
      getCategoryOp();
    }
    if (Utils.isUndefinedOrNullOrEmptyList(porductData)) {
      const userId = cookie.get('userId');
      getProductList(userId);
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

  setProductOption = (data) => {
    const porductOption = data.map(item => ({ value: item._id, label: item.title }));
    this.setState({ porductOption });
  }


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
      <div className="formWrap">
        {locals.inputs.product}
      </div>
      <div className="formWrap">
        {locals.inputs.tagUsers}
      </div>
      <div className="formWrap">{locals.inputs.quantity}</div>
      <div className="formWrap">{locals.inputs.discount}</div>
      <div className="formWrap">{locals.inputs.timer}</div>
    </>
  );

  getFormSchema = () => {
    const { postFormData } = this.state;
    const formSchema = {
      postCategories: t.Object,
      title: t.String,
      tagUsers: t.maybe(t.Array),
      product: t.maybe(t.Object),
    };

    if (!Utils.isUndefinedOrNullOrEmptyList(postFormData.product)) {
      formSchema.quantity = t.String;
      formSchema.discount = t.String;
      formSchema.timer = t.String;
    }

    return t.struct(formSchema);
  }

  getFormOptions = () => {
    const { catOption, porductData } = this.props;
    let productOpt = [];
    if (!Utils.isUndefinedOrNullOrEmptyList(porductData)) {
      productOpt = porductData.map(item => ({ value: item._id, label: item.title }));
    }

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

        product: {
          template: airvForm.templates.select,
          label: 'Add Product',
          attrs: {
            placeholder: 'Select Product',
            simpleValue: true,
            clearable: true,
          },
          options: productOpt,
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

        quantity: {
          label: 'Stock Availability',
          template: airvForm.templates.textbox,
          error: 'Discount is required',
          type: 'text',
          attrs: {
            validateRegex: /^[0-9]{1,5}[:.,-]?$/,
            placeholder: 'Quantity',
          },
        },
        timer: {
          label: 'Discount Timer',
          template: airvForm.templates.textbox,
          error: 'Discount is required',
          type: 'text',
          attrs: {
            validateRegex: /^[0-9]{1,5}[:.,-]?$/,
            placeholder: 'Enter time in minutes',
          },
        },
      },
    });
  }

  submit = () => {
    const { addPost, porductData } = this.props;
    const { postFormData } = this.state;
    const errors = this.postForm.getValue();
    this.setState({ isSubmitted: true });
    if (Utils.isUndefinedOrNullOrEmptyObject(errors)) {
      return;
    }

    const formData = Utils.deepCopy(postFormData);
    formData.type = 'stream';
    const tagUserData = [];
    if (!Utils.isUndefinedOrNullOrEmptyList(formData.tagUsers)) {
      formData.tagUsers.forEach((item) => {
        tagUserData.push({ userId: item.value, username: item.label });
      });
    }
    formData.postCategories = [{ categoryId: formData.postCategories.value, title: formData.postCategories.label }];
    formData.tagUsers = tagUserData;

    if (!Utils.isUndefinedOrNullOrEmptyObject(postFormData.product)) {
      const dataObj = { };
      const productArr = porductData.filter(item => (item._id === postFormData.product.value));
      dataObj.productId = productArr[0]._id,
      dataObj.title = productArr[0].title,
      dataObj.quantity = Number(formData.quantity),
      dataObj.discount = formData.discount,
      dataObj.featuredImage = productArr[0].featuredImages[0].featuredImage,
      dataObj.timer = Number(formData.timer),
      dataObj.price = Number(productArr[0].price),
      dataObj.airToken = productArr[0].airToken,
      delete (formData.discount);
      delete (formData.quantity);
      delete (formData.timer);
      formData.product = [dataObj];
    }

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
  porductData: PropTypes.array.isRequired,
  getProductList: PropTypes.func.isRequired
};


const mapStateToProps = ({
  live: {
    inProcess, catOption, isAddPost, porductData
  }, userDetails: { userData }
}) => ({
  inProcess, catOption, isAddPost, porductData, userData
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddPost);
