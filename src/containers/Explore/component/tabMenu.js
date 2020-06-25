/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * About
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import * as Actions from '../actions';

function TabMenu({ tabMenu, tabValue, updateTabValue }) {
  const menuList = data => data.map((item, index) => {
    const idx = `content-${index}`;
    return (
      <span
        className={classNames('actionButton', { active: tabValue === item.value })}
        key={idx}
        onClick={() => updateTabValue(item.value)}
        role="button"
        tabIndex={0}
      >
        {item.name}
      </span>
    );
  });

  return (
    <div className="buttonWrapper menuWrap">
      <div className="listWrapper">{!Utils.isUndefinedOrNullOrEmptyList(tabMenu) && menuList(tabMenu)}</div>
    </div>
  );
}

TabMenu.propTypes = {
  tabMenu: PropTypes.array.isRequired,
  tabValue: PropTypes.string.isRequired,
  updateTabValue: PropTypes.func.isRequired,
};


const mapStateToProps = ({ explore: { tabMenu, tabValue } }) => ({ tabMenu, tabValue });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TabMenu);
