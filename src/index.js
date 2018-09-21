import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxMulti from 'redux-multi';
import { Provider } from 'react-redux';

import 'normalize.css';
import './index.scss';
import 'moment/locale/ru';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import currencyReducer from 'store/reducers/currency';
import ticketsReducer from 'store/reducers/tickets';

const rootReducer = combineReducers( {
    currency : currencyReducer,
    tickets  : ticketsReducer,
} );

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( rootReducer, composeEnhancers(
    applyMiddleware( reduxThunk, reduxMulti )
) );

const app = (
    <Provider store={ store }>
        <App />
    </Provider>
);

ReactDOM.render( app, document.getElementById('root') );
registerServiceWorker();
