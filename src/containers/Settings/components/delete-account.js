import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
// import Utils from '../../../utils/common';
import * as Actions from '../actions';

function Delete() {
  return (
    <>
      <div className="p-3">
        <h5 className="mb-0">Delete Your Account</h5>
      </div>
      <hr className="m-0" />
      <div className="delete-account-hadding">
        <h5>Are you sure you want to delete Your account?</h5>
        <p>Please Let Us know the reason why you are leaving.</p>
      </div>
      <form className="uk-child-width-1@s uk-grid-small p-4 uk-grid">
        <div className="delete-account-reason">
          <h5 className="uk-text-bold mb-2"> Enter your Reason </h5>
          <textarea placeholder="Others..." cols="5" />
        </div>
      </form>

      <div className="uk-flex uk-flex-right p-4">
        <button type="button" className="button soft-warning mr-2">
          Cancle
        </button>
        <button type="button" className="button warning">
          Delete Account
        </button>
      </div>
    </>
  );
}

Delete.propTypes = { };


const mapStateToProps = ({ userDetails: { userData } }) => ({ userData });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Delete);
