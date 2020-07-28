/**
 *
 * Footer
 *
 */

import React, { memo } from 'react';

function Footer() {
  return (
    <div className="footer">
      <div className="uk-grid-collapse uk-grid footerWrapper">
        <div id="foot" className="uk-width-expand@s uk-first-column">
          <div className="foot-content">
            <p>
              © 2019
              {' '}
              <strong>AirVting</strong>
              . All Rights Reserved.
              {' '}
            </p>
          </div>
        </div>
        {/* <div className="uk-width-auto@s">
          <nav className="footer-nav-icon">
            <ul>
              <li>
                <a href="void(0)">
                  <i className="icon-brand-facebook" />
                </a>
              </li>
              <li>
                <a href="void(0)">
                  <i className="icon-brand-dribbble" />
                </a>
              </li>
              <li>
                <a href="void(0)">
                  <i className="icon-brand-youtube" />
                </a>
              </li>
              <li>
                <a href="void(0)">
                  <i className="icon-brand-twitter" />
                </a>
              </li>
            </ul>
          </nav>
        </div> */}
      </div>
    </div>
  );
}

Footer.propTypes = {};

export default memo(Footer);
