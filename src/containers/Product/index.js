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
import Modal from '../../components/Modal';
import ImageUpload from '../../components/imageUpload';
import './index.css';

export function Product({
  inProcess, addProduct, categoryOption, getProductCategoryOption, isAddProduct, closeAddProductModal
}) {
  const addProdRef = useRef(null);

  const [prodFormData, setProductFormData] = useState({});
  const [imageUpload, setImageUpload] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isImageUpload, setISImageUpload] = useState(false);

  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyList(categoryOption)) {
      getProductCategoryOption();
    }
  }, []);

  const onChange = (formValue) => {
    if (isSubmitted) {
      addProdRef.current.validate();
    }
    setProductFormData(formValue);
  };

  const formSchema = {
    productCategories: t.Object,
    title: t.String,
    condition: t.String,
    description: t.String,
    price: t.String,
    discount: t.String,
    expiredAt: t.Number,
    startedAt: t.Number,
    // featuredImages0: t.Object,
  };

  const getImageData = (file) => {
    if (!Utils.isUndefinedOrNullOrEmptyList(imageUpload)) {
      setISImageUpload(false);
      return;
    }
    setImageUpload(file);
  };

  const getLoginFormTemplate = locals => (
    <>
      <div className="formInputWrap">
        {locals.inputs.productCategories}
        {' '}
        {locals.inputs.title}
      </div>
      <div className="formInputWrap">
        {locals.inputs.condition}
        {/* {locals.inputs.featuredImages0} */}
      </div>
      <div className="formInputWrap">
        {locals.inputs.price}
        {' '}
        {locals.inputs.discount}
      </div>
      <div className="formInputWrap">
        {locals.inputs.expiredAt}
        {' '}
        {locals.inputs.startedAt}
      </div>
      <div className="formInputWrap">{locals.inputs.description}</div>
      <div className="formInputWrap imageUploadWrap">
        <ImageUpload isMulti getImageData={getImageData} />
        {isImageUpload && <span className="error"> Please Upload Images. </span>}
      </div>
    </>
  );

  const getFormSchema = () => t.struct(formSchema);

  const getFormOptions = () => ({
    template: getLoginFormTemplate,
    fields: {
      productCategories: {
        label: 'Product Categories',
        template: airvForm.templates.select,
        attrs: {
          placeholder: 'Select Category Name',
          simpleValue: true,
          clearable: true,
        },
        options: categoryOption,
        error: 'Product Categories is required',
        factory: t.form.Select,
      },
      title: {
        label: 'Title',
        template: airvForm.templates.textbox,
        attrs: {
          placeholder: 'Title',
        },
        error: 'Title is required',
      },
      condition: {
        label: 'Condition',
        template: airvForm.templates.textbox,
        error: 'Condition is required',
        attrs: {
          placeholder: 'Enter Condition',
        },
      },
      price: {
        template: airvForm.templates.textbox,
        label: 'Price',
        attrs: {
          placeholder: 'Enter Price',
          validateRegex: /^\d+$/,
        },
        error: 'Price is required',
      },
      discount: {
        template: airvForm.templates.textbox,
        label: 'Discount',
        attrs: {
          placeholder: 'Enter discount',
          validateRegex: /^\d+$/,
        },
        error: 'Discount is required',
      },

      description: {
        label: 'Description',
        template: airvForm.templates.textbox,
        error: 'Description is required',
        type: 'textarea'
      },

      // featuredImages0: {
      //   label: 'Featured Image',
      //   template: airvForm.templates.textbox,
      //   error: 'Featured Image is required',
      //   type: 'file'
      // },
      expiredAt: {
        template: airvForm.templates.date,
        label: 'Expired At',
        attrs: {
          timeFormat: false,
          placeholder: 'Expired At',
          dateFormat: 'dd MMM yyyy',
        },
        transformer: airvForm.transformers.dateTransformer,
        error: 'Expired At is required',
      },
      startedAt: {
        template: airvForm.templates.date,
        label: 'Started At',
        attrs: {
          timeFormat: false,
          placeholder: 'Started At',
          dateFormat: 'dd MMM yyyy',
        },
        transformer: airvForm.transformers.dateTransformer,
        error: 'Started At is required',
      },
    },
  });

  const submit = () => {
    setIsSubmitted(true);
    const { errors } = addProdRef.current.validate();
    if (!Utils.isEmptyList(errors)) {
      return;
    }
    if (Utils.isUndefinedOrNullOrEmptyList(imageUpload)) {
      setISImageUpload(true);
      return;
    }

    console.log('imageUpload === ', imageUpload);
    const {
      productCategories, title, condition, description, price, discount, expiredAt, startedAt
    } = prodFormData;

    const formData = new FormData();
    const prodCat = [{ categoryId: productCategories.value, title: productCategories.label }];
    formData.append('productCategories', prodCat);
    formData.append('title', title);
    formData.append('condition', condition);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('featuredImages', imageUpload);
    formData.append('discount', discount);
    formData.append('expiredAt', Utils.formatDate(expiredAt, 'dd-mm-yyyy'));
    formData.append('startedAt', Utils.formatDate(startedAt, 'dd-mm-yyyy'));
    addProduct(formData);
  };

  const getContent = () => (
    <div className="addProductWrapper">
      <div className="formWrapper">
        <t.form.Form ref={addProdRef} type={getFormSchema()} value={prodFormData} options={getFormOptions()} onChange={onChange} />
      </div>
      <div className="uk-flex uk-flex-right p-4">
        <button type="button" className="button warning" onClick={submit}>
          Add Product
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
      {isAddProduct && (
        <Modal
          onCancel={() => closeAddProductModal()}
          modalContent={getContent()}
          modalHeader={<h2 className="uk-modal-title">Add Product</h2>}
          hasFooter={false}
        />
      )}
    </>
  );
}

Product.propTypes = {
  inProcess: PropTypes.bool.isRequired,
  addProduct: PropTypes.func.isRequired,
  categoryOption: PropTypes.array.isRequired,
  getProductCategoryOption: PropTypes.func.isRequired,
  isAddProduct: PropTypes.bool.isRequired,
  closeAddProductModal: PropTypes.func.isRequired,
};


const mapStateToProps = ({ product: { categoryOption, inProcess }, userDetails: { isAddProduct } }) => ({ categoryOption, inProcess, isAddProduct });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Product);
