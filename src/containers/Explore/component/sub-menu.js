/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Sub Menu
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Utils from '../../../utils/common';

function TabMenu({ getDataByFilter, subTabMenu, filter }) {
  const menuList = data => data.map((item, index) => {
    const idx = `content-${index}`;
    return (
      <span
        className={classNames('actionButton', { active: filter === item.value })}
        key={idx}
        onClick={() => getDataByFilter(item.value)}
        role="button"
        tabIndex={0}
      >
        {item.name}
      </span>
    );
  });

  return (
    <div className="buttonWrapper">
      <div className="listWrapper">{!Utils.isUndefinedOrNullOrEmptyList(subTabMenu) && menuList(subTabMenu)}</div>
    </div>
  );
}

TabMenu.propTypes = {
  subTabMenu: PropTypes.array.isRequired,
  getDataByFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};


export default memo(TabMenu);
