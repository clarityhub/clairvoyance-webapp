import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

const rootEl = document.getElementById('root');

ReactDOM.render((
  <App />
), rootEl);

if (module.hot) {
  require('preact/debug');

  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <NextApp />,
      rootEl
    );
  });
}

window.addEventListener('touchstart', function onFirstTouch() {
  window.touch = true;
  window.removeEventListener('touchstart', onFirstTouch, false);
}, false);

registerServiceWorker();
