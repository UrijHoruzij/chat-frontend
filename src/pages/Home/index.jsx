import React, { useEffect } from "react";
import { withRouter } from "react-router";
import {
  Sidebar,
  RightSidebar,
  Status,
  Messages,
  ChatInput,
} from "../../containers";
import { connect } from "react-redux";

// import { CircleButton, Avatar } from "../../components";
import { dialogsActions } from "../../redux/actions";

import "./Home.scss";

const Home = (props) => {
  const { setCurrentDialogId, user } = props;

  useEffect(() => {
    const pathname = props.location.pathname;
    const dialogId = pathname.split("/").pop();
    setCurrentDialogId(dialogId);
  }, [props.location.pathname, setCurrentDialogId]);

  return (
    <section className="home">
      <div className="header">
        <div className="header__logo">Чатик</div>
        {/* <div className="header__user">
          <CircleButton size="small" className="header__user-btn">
            {user && <Avatar user={user} size="small"></Avatar>}
          </CircleButton>
        </div> */}
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
        {user && <RightSidebar />}
      </div>
    </section>
  );
};

export default withRouter(
  connect(({ user }) => ({ user: user.data }), dialogsActions)(Home)
);
