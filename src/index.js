import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';

import appReducer from "./store/reducers";
import rootSaga from "./store/sagas";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  appReducer,
  composeWithDevTools(
    //redux saga middleware
    applyMiddleware(sagaMiddleware),
  )
);

// run the root saga when app loads
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
