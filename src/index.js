import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route } from "react-router-dom"
import * as serviceWorker from './serviceWorker';
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./reducer"
import 'semantic-ui-css/semantic.min.css'

const store = createStore(reducer)


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" render={routerProps => <App {...routerProps} /> }/>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
