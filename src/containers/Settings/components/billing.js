import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
// import Utils from '../../../utils/common';
import * as Actions from '../actions';

function Billing() {
  return (
    <>
      <div className="p-3">
        <h5 className="mb-0"> Billing address </h5>
      </div>
      <hr className="m-0" />
      <form className="uk-child-width-1-2@s uk-grid-small p-4 uk-grid">
        <div>
          <h5 className="uk-text-bold mb-2"> Number </h5>
          <input type="text" className="uk-input" placeholder="23, Block C2 " />
        </div>
        <div>
          <h5 className="uk-text-bold mb-2"> Street </h5>
          <input type="text" className="uk-input" placeholder="Street Number" />
        </div>
        <div>
          <h5 className="uk-text-bold mb-2"> City </h5>
          <input type="text" className="uk-input" placeholder="City Name" />
        </div>
        <div>
          <h5 className="uk-text-bold mb-2"> Postal Code </h5>
          <input type="text" className="uk-input" placeholder="Postal Code" />
        </div>
        <div>
          <h5 className="uk-text-bold mb-2"> State </h5>
          <input type="text" className="uk-input" placeholder="State" />
        </div>
        <div>
          <h5 className="uk-text-bold mb-2"> Country </h5>
          <input type="text" className="uk-input" placeholder="Your Country" />
        </div>
        <div>
          <h5 className="uk-text-bold mb-2"> Gender </h5>
          <select className="uk-select">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
      </form>
      <div className="uk-flex uk-flex-right p-4">
        <button type="button" className="button soft-warning mr-2">
          Cancle
        </button>
        <button type="button" className="button warning">
          Save Changes
        </button>
      </div>
    </>
  );
}

Billing.propTypes = { };


const mapStateToProps = ({ userDetails: { userData } }) => ({ userData });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Billing);
