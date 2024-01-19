import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.scss';
import { store } from "./store/store";
Provider

ReactDOM.createRoot(document.getElementById('root')).render( 
    <Provider store={store}>
      <App /> 
    </Provider>
    
);
