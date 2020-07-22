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
        partner={{
          avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
          fullname: "Роман Гордеев",
          isOnline: true,
        }}
        lastMessage={{
          text:
            "Повседневная практика показывает, что реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития.",
          date: new Date(),
          isReaded: false,
          count: "5",
        }}
      ></DialogsItem>
      <DialogsItem
        partner={{
          avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
          fullname: "Роман Гордеев",
          isOnline: true,
        }}
        lastMessage={{
          text:
            "Повседневная практика показывает, что реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития.",
          date: new Date(),
          isReaded: false,
          count: "5",
        }}
      ></DialogsItem>
      <DialogsItem
        partner={{
          avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
          fullname: "Роман Гордеев",
          isOnline: true,
        }}
        lastMessage={{
          text:
            "Повседневная практика показывает, что реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития.",
          date: new Date(),
          isReaded: false,
          count: "5",
        }}
      ></DialogsItem>
      <DialogsItem
        partner={{
          avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
          fullname: "Роман Гордеев",
          isOnline: true,
        }}
        lastMessage={{
          text:
            "Повседневная практика показывает, что реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития.",
          date: new Date(),
          isReaded: false,
          count: "5",
        }}
      ></DialogsItem>
      <DialogsItem
        partner={{
          avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
          fullname: "Роман Гордеев",
          isOnline: true,
        }}
        lastMessage={{
          text:
            "Повседневная практика показывает, что реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития.",
          date: new Date(),
          isReaded: false,
          count: "5",
        }}
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
