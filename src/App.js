import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import socketIOClient from "socket.io-client";
import dotenv from "dotenv";

import { Auth, Home } from "./pages";
import DialogsItem from "./components/DialogsItem";
dotenv.config({ path: "../.env" });

const App = (props) => {
  const { isAuth } = props;
  return (
    <div className="wrapper">
      <DialogsItem
        avatar="https://images.unsplash.com/photo-1594840295384-3aad16925a4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        partner="Helena Lopes"
        isOnline
      ></DialogsItem>
      <Switch>
        <Route exact path={["/signin", "/signup"]} component={Auth} />
        <Route
          path="/"
          render={() => (isAuth ? <Home /> : <Redirect to="/signin" />)}
        />
      </Switch>
    </div>
  );
};
export default App;
