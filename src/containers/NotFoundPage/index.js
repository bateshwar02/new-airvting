import React from 'react';
import Navigation from '../../utils/navigation';
import './index.css';

export default function NotFound() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <img src="/image/emoji.png" alt="data not found" />
        </div>
        <h1>404</h1>
      </div>
      <div className="textWrapper">
        <h2>Oops! Page Not Found</h2>
        <a href={Navigation.home}>Back to homepage</a>
      </div>
    </div>
  );
}
