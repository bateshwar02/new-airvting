/**
 *
 * NoDataFound
 *
 */

import React, { memo } from 'react';
import './index.css';

function NoDataFound() {
  return (
    <div className="npDataFoundWrapper">
      <div className="imageWrapper">
        <img src="/image/data_not_found.png" alt="" />
      </div>
    </div>
  );
}

export default memo(NoDataFound);
