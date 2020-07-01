import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import * as Actions from '../actions';
import Utils from '../../../utils/common';
import ChildDataWrapper from './productListData';
import Loader from '../../../components/Loader';
// import Navigation from '../../../utils/navigation';

function ProductByCategory({ categoryData, getCategory, productLikedAction }) {
  const [inProcess, setInProcess] = useState(true);
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyList(categoryData)) {
      getCategory();
    }
    if (!Utils.isUndefinedOrNullOrEmptyList(categoryData)) {
      setInProcess(false);
    }
  }, [categoryData]);


  const getChildDataWrapper = id => <ChildDataWrapper id={id} productLikedAction={productLikedAction} />;

  const childComponent = () => {
    if (Utils.isUndefinedOrNullOrEmptyList(categoryData)) {
      return null;
    }

    return categoryData.map((item, index) => {
      const keys = `${index}-${item.title}`;
      return (
        <>
          <div className="video-grid-slider mt-4" uk-slider="finite: true" key={keys}>
            <div className="grid-slider-header">
              <div>
                <h3>{item.title.replace('|', "'")}</h3>
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
    <div className="sections-small">
      {childComponent()}
      <Loader inProcess={inProcess} />
    </div>
  );
}

ProductByCategory.propTypes = {
  categoryData: PropTypes.array.isRequired,
  getCategory: PropTypes.func.isRequired,
  productLikedAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  home: { categoryData }
}) => ({ categoryData });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductByCategory);
