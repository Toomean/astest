import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './index.scss';
import 'moment/locale/ru';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
