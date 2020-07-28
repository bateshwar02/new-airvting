/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Utils from '../../../utils/common';
import Loader from '../../../components/Loader';
import Modal from '../../../components/Modal';
import AddAddress from './addAddress';
import EditAddress from './editAddress';
import PaymentMethod from './paymentType';

function AddressList({
  getAddress, addressList, inProcess, isAddAddress, updateAddAddressAction, deleteAddress, editAction, isEdit, updateAddressById, isPaymentMethodAction, updateIsUpdateMethodAction, editAddress
}) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyList(addressList)) {
      getAddress();
    }
  }, []);

  const updateDefaultAddress = (id) => {
    const addressDataById = addressList.filter(item => item._id === id);
    if (!Utils.isUndefinedOrNullOrEmptyObject(addressDataById[0])) {
      const formData = Utils.deepCopy(addressDataById[0]);
      delete (formData._id);
      formData.is_default = true;
      editAddress(formData, id);
    }
  };

  const checkboxCheck = (event) => {
    updateDefaultAddress(event.target.value);
  };

  const editAddressValue = (id) => {
    const addressDataById = addressList.filter(item => item._id === id);
    if (!Utils.isUndefinedOrNullOrEmptyObject(addressDataById[0])) {
      updateAddressById(addressDataById[0]);
      editAction(true);
    }
  };

  const getAddressList = () => {
    if (!Utils.isUndefinedOrNullOrEmptyList(addressList)) {
      return addressList.map((item, index) => {
        const keys = `keys-index-${index}`;

        return (
          <div className="addressElements" key={keys}>
            <div className="mycart-ceakbox">
              <input type="checkbox" name="cheakbox-mycart" value={item._id} onChange={checkboxCheck} checked={item.is_default} />
            </div>
            <div className="addressWrap">
              <span>
                {item.full_name}
              </span>
              <span>
                {item.street}
              </span>
              <span>
                {`${item.city} ${item.state} ${item.country} - ${item.postalCode}`}
              </span>
            </div>
            <div className="actionWrap">
              <span className="iconWrap" title="Edit Address" onClick={() => editAddressValue(item._id)}>
                <i className="fa fa-pencil" aria-hidden="true" />
              </span>
              <span className="iconWrap" title="Delete Address" onClick={() => { deleteAddress(item._id); }}>
                <i className="fa fa-trash-o" aria-hidden="true" />
              </span>
            </div>
          </div>
        );
      });
    }
    return (
      <div className="addressList">
        <span className="alert">No Billing Address.</span>
      </div>
    );
  };

  const buttonWrap = () => (
    <div className="buttonWrapCont">
      <button type="button" className="button warning" onClick={() => updateIsUpdateMethodAction(true)}>
        Continue
      </button>
    </div>
  );

  return (
    <div className="m-cart-box">
      <div className="headerWrap">
        <span className="header">
          <h4> Billing Address </h4>
        </span>
        <span className="actionWrapp">
          <button className="addAddressButton" type="button" onClick={() => updateAddAddressAction(true)}>Add Address</button>
        </span>
      </div>
      <div className="uk-grid dataWrap">
        <div className="addressWrapper">
          {!inProcess && getAddressList()}
          {(!inProcess && !Utils.isUndefinedOrNullOrEmptyList(addressList)) && buttonWrap()}
          {(!isAddAddress && !isEdit) && <Loader inProcess={inProcess} />}
        </div>
      </div>
      {(isAddAddress && !isEdit) && (
      <Modal
        onCancel={() => { updateAddAddressAction(false); }}
        modalContent={<AddAddress />}
        modalHeader={<h2 className="uk-modal-title">Add Address</h2>}
        hasFooter={false}
      />
      )}
      {(isEdit && !isAddAddress) && (
        <Modal
          onCancel={() => { editAction(false); }}
          modalContent={<EditAddress />}
          modalHeader={<h2 className="uk-modal-title">Update Address</h2>}
          hasFooter={false}
        />
      )}
      {isPaymentMethodAction && (
      <Modal
        onCancel={() => { updateIsUpdateMethodAction(false); }}
        modalContent={<PaymentMethod />}
        modalHeader={<h2 className="uk-modal-title">Payment Methods</h2>}
        hasFooter={false}
        modalClass="small"
      />
      )
      }
    </div>

  );
}

AddressList.propTypes = {
  getAddress: PropTypes.func.isRequired,
  addressList: PropTypes.array.isRequired,
  inProcess: PropTypes.bool.isRequired,
  isAddAddress: PropTypes.bool.isRequired,
  updateAddAddressAction: PropTypes.func.isRequired,
  deleteAddress: PropTypes.func.isRequired,
  editAction: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  updateAddressById: PropTypes.func.isRequired,
  isPaymentMethodAction: PropTypes.bool.isRequired,
  updateIsUpdateMethodAction: PropTypes.func.isRequired,
  editAddress: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  carts: {
    addressList, inProcess, isAddAddress, isEdit, isPaymentMethodAction
  }
}) => ({
  addressList, inProcess, isAddAddress, isEdit, isPaymentMethodAction
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddressList);
