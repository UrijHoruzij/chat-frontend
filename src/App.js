import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import socketIOClient from "socket.io-client";
import dotenv from "dotenv";

import { Auth, Home } from "./pages";

import Dialogs from "./components/Dialogs";
import Messages from "./components/Messages";

dotenv.config({ path: "../.env" });

const App = (props) => {
  const { isAuth } = props;
  // const isAuth = true;
  return (
    <div className="wrapper">
      <Dialogs
        items={[
          {
            _id: "1",
            userId: "233354",
            currentDialogId: "123",
            partner: {
              avatar:
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
              fullname: "Роман Гордеев",
              isOnline: true,
            },
            lastMessage: {
              userId: "233354",
              text:
                "Повседневная практика показывает, что реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития.",
              date: new Date(),
              isReaded: false,
              count: "5",
              attachments: [],
            },
          },
          {
            _id: "2",
            userId: "233354",
            currentDialogId: "123",
            partner: {
              avatar:
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
              fullname: "Роман Гордеев",
              isOnline: true,
            },
            lastMessage: {
              userId: "233354",
              text:
                "Повседневная практика показывает, что реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития.",
              date: new Date(),
              isReaded: false,
              count: "5",
              attachments: [],
            },
          },
          {
            _id: "3",
            userId: "233354",
            currentDialogId: "123",
            partner: {
              avatar:
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
              fullname: "Роман Гордеев",
              isOnline: true,
            },
            lastMessage: {
              userId: "233354",
              text:
                "Повседневная практика показывает, что реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития.",
              date: new Date(),
              isReaded: false,
              count: "5",
              attachments: [],
            },
          },
          {
            _id: "4",
            userId: "233354",
            currentDialogId: "123",
            partner: {
              avatar:
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
              fullname: "Роман Гордеев",
              isOnline: true,
            },
            lastMessage: {
              userId: "233354",
              text:
                "Повседневная практика показывает, что реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития.",
              date: new Date(),
              isReaded: false,
              count: "5",
              attachments: [],
            },
          },
          {
            _id: "5",
            userId: "233354",
            currentDialogId: "123",
            partner: {
              avatar:
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
              fullname: "Роман Гордеев",
              isOnline: true,
            },
            lastMessage: {
              userId: "233354",
              text:
                "Повседневная практика показывает, что реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития.",
              date: new Date(),
              isReaded: false,
              count: "5",
              attachments: [],
            },
          },
          {
            _id: "6",
            userId: "233354",
            currentDialogId: "1235",
            partner: {
              avatar:
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
              fullname: "Роман Гордеев",
              isOnline: true,
            },
            lastMessage: {
              userId: "238354",
              text:
                "Повседневная практика показывает, что реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития.",
              date: new Date(),
              isReaded: false,
              count: "5",
              attachments: [],
            },
          },
          {
            _id: "7",
            userId: "233354",
            partner: {
              avatar:
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
              fullname: "Роман Гордеев",
              isOnline: true,
            },
            lastMessage: {
              userId: "233394",
              text:
                "Повседневная практика показывает, что реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития.",
              date: new Date(),
              isReaded: false,
              count: "11",
              attachments: [],
            },
          },
        ]}
      ></Dialogs>
      <Messages
        items={[
          {
            user: {
              _id: "123",
              avatar:
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
              fullname: "Helena Lopes",
            },
            text: "Привет!",
            date: new Date(),
            attachments: [
              {
                filename: "Helena Lopes",
                url:
                  "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
              },
            ],
          },
          {
            user: {
              _id: "123",
              avatar:
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
              fullname: "Helena Lopes",
            },
            date: new Date(),
            audio:
              "https://notificationsounds.com/soundfiles/5d44ee6f2c3f71b73125876103c8f6c4/file-sounds-1152-swinging.mp3",
          },
        ]}
        user={{
          _id: "1",
          avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
          name: "Helena Lopes",
        }}
        partner={{
          _id: "2",
          avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
          name: "Helena Lopes",
        }}
      ></Messages>
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
