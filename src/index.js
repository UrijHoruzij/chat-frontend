import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import "./styles/index.scss";
import "antd/dist/antd.css";
import "emoji-mart/css/emoji-mart.css";

import App from "./App";

import { userActions } from "./redux/actions";
import store from "./redux/store";

store.dispatch(userActions.fetchUserData());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
