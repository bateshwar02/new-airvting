import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Utils from '../../../utils/common';
import ChildDataWrapper from './productList';
// import Navigation from '../../../utils/navigation';

function ProductByCategory({ categoryData }) {
  const getChildDataWrapper = id => <ChildDataWrapper id={id} />;

  const childComponent = () => {
    if (Utils.isUndefinedOrNullOrEmptyList(categoryData)) {
      return null;
    }
    console.log('categoryData === ', categoryData);
    return categoryData.map((item, index) => {
      const keys = `${index}-${item._id}`;
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
      <div className="uk-child-width-1-4@m uk-child-width-1-3@s uk-grid">
        {childComponent()}
      </div>
    </div>


  );
}

ProductByCategory.propTypes = {
  categoryData: PropTypes.array.isRequired,
};

export default memo(ProductByCategory);
