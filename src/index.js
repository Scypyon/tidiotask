import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { reducer } from "./store/index.js"
import "./index.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchAgeUp } from "./sagas/saga.js";

import Todo from "./components/TodoList";

function NoMatch() {
  return <Redirect to="/login" />;
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAgeUp);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" exec component={App} />
        <Route path="/todo" exec component={Todo} />
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
    ,
  </Provider>,
  document.getElementById("root")
);
