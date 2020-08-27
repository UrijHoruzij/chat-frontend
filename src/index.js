import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import "./styles/index.scss";
import "antd/dist/antd.css";
import "emoji-mart/css/emoji-mart.css";

import App from "./App";

import { userActions } from "./redux/actions";
import socket from "./core/socket";
import store from "./redux/store";

const updateRefresh = () => {
  if (window.localStorage["refreshToken"]) {
    socket.emit("USER:REFRESH", {
      refreshToken: window.localStorage["refreshToken"],
    });
    socket.on("USER:REFRESH", (data) => {
      if (data.status === 200) {
        const { token, refreshToken } = data;
        window.axios.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        window.localStorage["token"] = token;
        window.localStorage["refreshToken"] = refreshToken;
      }
      if (data.status === 401) {
        store.dispatch(userActions.setIsAuth(false));
        delete window.localStorage.token;
        delete window.localStorage.refreshToken;
      }
    });
  }
};
updateRefresh();
store.dispatch(userActions.fetchUserData());
setInterval(updateRefresh, 60000);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
