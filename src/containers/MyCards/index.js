/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/**
 *
 * Store
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as Actions from './actions';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import Addcard from './components/addCard';
import CardList from './components/cardList';
import './index.css';

export function MyCards({isCardAdd, isAddCard}) {
  const getStoreContent = () => (
    <div className="main_content">
      <div className="main_content_inner ">
      <div className="headerWrapper">
              <span className='headerText'>  <h2> MY CARD </h2> </span>
              <span className="ButtonWrapper" onClick={()=>isAddCard(true)} role="button" tabIndex={0}>
              <span className="add-card-btn  button default">+</span>
              Add New Card
              </span>
            </div>
            <div className="childData">
              <CardList />
              {isCardAdd &&  <Modal
                  onCancel={() => isAddCard(false)}
                  modalContent={<Addcard />}
                  modalHeader={<h2 className="uk-modal-title">Add Cards</h2>}
                  hasFooter={false}
        />}
            </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div id="wrapper">
      <Sidebar />
      <Header />
      {getStoreContent()}
    </div>
  );
}

MyCards.propTypes = {
  isCardAdd: PropTypes.bool.isRequired,
  isAddCard: PropTypes.func.isRequired
};


const mapStateToProps = ({ cards: {isCardAdd} }) => ({ isCardAdd });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyCards);
