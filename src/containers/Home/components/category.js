import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import * as Actions from '../action';
import ChildDataWrapper from './categoryWiseData';

function Category({ categoryData, getCategoryData }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyList(categoryData)) {
      getCategoryData();
    }
  }, [categoryData]);

  const getChildDataWrapper = id => <ChildDataWrapper id={id} />;

  const getDataWrapper = () => {
    if (Utils.isUndefinedOrNullOrEmptyList(categoryData)) {
      return null;
    }
    return categoryData.map((item, index) => {
      const keys = `${index}-${item._id}`;
      return (
        <>
          <div className="video-grid-slider mt-4" uk-slider="finite: true" key={keys}>
            <div className="grid-slider-header">
              <div>
                <h3>{item.title.replace('|', "'")}</h3>
                <p> Channals You are Fallowing. </p>
              </div>
              <div className="grid-slider-header-link">
                <div className="btn-arrow-slider">
                  <a href="void(0)" className="btn-arrow-slides" uk-slider-item="previous">
                    <span className="arrow-left" />
                  </a>
                  <a href="void(0)" className="btn-arrow-slides" uk-slider-item="next">
                    <span className="arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <ul className="uk-slider-items uk-child-width-1-4@m uk-child-width-1-3@s uk-grid">
              {getChildDataWrapper(item._id)}
            </ul>
          </div>
          <hr className="m-0" />
        </>
      );
    });
  };

  return (
    <>
      {getDataWrapper()}
    </>

  );
}

Category.propTypes = {
  categoryData: PropTypes.array.isRequired,
  getCategoryData: PropTypes.func.isRequired,
};

const mapStateToProps = ({ home: { categoryData } }) => ({ categoryData });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Category);
