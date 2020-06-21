import React, {
  memo, useRef, useEffect, useState
} from 'react';
// import PropTypes from 'prop-types';
import './index.css';

function Switch() {
  const switchRef = useRef(null);
  const [switchCheck, setSwitchCheck] = useState(false);
  useEffect(() => {
    const isNightMode = localStorage.getItem('gmtNightMode');
    setSwitchCheck(!isNightMode);
  }, []);

  const steSwitchCase = () => {
    const isNightMode = localStorage.getItem('gmtNightMode');
    localStorage.setItem('gmtNightMode', !isNightMode);
    setSwitchCheck(!isNightMode);
  };

  return (
    <div className="switch-container">
      <label htmlFor="switch">
        <input ref={switchRef} checked={switchCheck} onChange={steSwitchCase} className="switch" type="checkbox" />
        <div>

          <div />
        </div>
      </label>
    </div>
  );
}

Switch.propTypes = { };

Switch.defaultProps = {
  inProcess: false,
};

export default memo(Switch);
