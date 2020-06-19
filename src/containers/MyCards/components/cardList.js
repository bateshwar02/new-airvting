/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Card List
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Utils from '../../../utils/common';
import Loader from '../../../components/Loader';

function CardList({
  gertCards, cardsData, inProcess, deleteCard, getCardDetails
}) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(cardsData)) {
      gertCards();
    }
  }, []);


  const getCardsList = () => {
    if (!Utils.isUndefinedOrNullOrEmptyObject(cardsData)) {
      const { paymentDetail } = cardsData;
      if (!Utils.isUndefinedOrNullOrEmptyList(paymentDetail)) {
        return paymentDetail.map((item, index) => {
          const keys = `keys-index-${index}`;
          return (
            <tr key={keys}>
              <td className="my-card-table-img-td">
                <div className="my-card-table-img">
                  <img src={item.featuredImage} alt="" />
                </div>
              </td>
              <td>
                <div className="my-card-table-detial">
                  <p>
                    {item.title}
                    {' '}
                    -
                    {' '}
                    {item.cardType}
                    {' '}
                  </p>
                  <p>
                    {item.expiryMonth}
                    |
                    {item.expiryYear}
                  </p>
                </div>
              </td>
              <td>
                <div className="my-card-table-cheak" />
                <div className="actionWrapper">
                  <span onClick={() => { getCardDetails(item._id); }}>
                    {' '}
                    <i className="icon-feather-edit" />
                  </span>
                  <span role="button" tabIndex={0} onClick={() => deleteCard(item._id)}>
                    <i className="icon-feather-trash-2" />
                  </span>
                </div>
              </td>
            </tr>
          );
        });
      }
      return (
        <tr>
          <td className="my-card-table-img-td">
            <span className="alert">No Card is added.</span>
          </td>
        </tr>
      );
    }
    return null;
  };

  const getContent = () => (
    <table className="uk-table uk-table-middle uk-table-justify uk-table-striped my-card-table ">
      <tbody>
        {getCardsList()}
      </tbody>
    </table>

  );

  return (
    <div className="uk-grid">
      <div className="uk-width-1-1">
        <div className="my-card-box">
          {getContent()}
        </div>
      </div>
      <Loader inProcess={inProcess} />
    </div>

  );
}

CardList.propTypes = {
  gertCards: PropTypes.func.isRequired,
  cardsData: PropTypes.object.isRequired,
  inProcess: PropTypes.bool.isRequired,
  deleteCard: PropTypes.func.isRequired,
  getCardDetails: PropTypes.func.isRequired,
};

const mapStateToProps = ({ cards: { cardsData, inProcess, cardDetails } }) => ({ cardsData, inProcess, cardDetails });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CardList);
