import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { RightSidebar } from "../../components";

import { Sidebar, Status, Messages, ChatInput } from "../../containers";
import { connect } from "react-redux";
import { CircleButton, Avatar } from "../../components";
import "./Home.scss";

import { dialogsActions } from "../../redux/actions";

const Home = (props) => {
  const { setCurrentDialogId, user } = props;
  useEffect(() => {
    const { pathname } = props.location;
    const dialogId = pathname.split("/").pop();
    setCurrentDialogId(dialogId);
  }, [props.location.pathname]);

  return (
    <section className="home">
      <div className="header">
        <div className="header__logo">Чатик</div>
        <div className="header__user">
          <CircleButton>{user && <Avatar user={user}></Avatar>}</CircleButton>
        </div>
      </div>
      <div className="chat">
        <Sidebar />
        {user && (
          <div className="chat__dialog">
            <Status />
            <Messages />
            <div className="chat__dialog-input">
              <ChatInput />
            </div>
          </div>
        )}
        <RightSidebar />
      </div>
    </section>
  );
};

export default withRouter(
  connect(({ user }) => ({ user: user.data }), dialogsActions)(Home)
);
