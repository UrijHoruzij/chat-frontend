import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import socket from "../core/socket";
import { filesApi } from "../utils/api";
import { userActions } from "../redux/actions";

import { RightSidebar as BaseRightSidebar } from "../components";

const RightSidebarContainer = ({ user, setAvatar, setFullname, logout }) => {
  // const [shared, setShared] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [userName, setUserName] = useState(user.fullname);

  const onClose = () => {
    setVisible(false);
  };
  const onShow = () => {
    setVisible(true);
  };

  const onSave = () => {
    setFullname(userName);
    setVisible(false);
  };
  const onExit = () => {
    logout();
  };
  const onSelectFile = async (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // eslint-disable-next-line no-loop-func
      await filesApi.upload(file).then(({ data }) => {
        setAvatar({ avatar: data.file.url });
        socket.emit("SERVER:USER_AVATAR_UPDATE");
      });
    }
  };

  const onChangeInput = (e) => {
    setUserName(e.target.value);
  };

  useEffect(() => {
    socket.on("SERVER:USER_ONLINE", (data) => {});
    socket.on("SERVER:USER_AVATAR_UPDATE");
  }, []);

  return (
    <BaseRightSidebar
      user={user}
      // shared={shared}
      visible={visible}
      onChangeInput={onChangeInput}
      userName={userName}
      onClose={onClose}
      onShow={onShow}
      onSelectFile={onSelectFile}
      onExit={onExit}
      onSave={onSave}
    />
  );
};

export default connect(
  ({ user }) => ({ user: user.data }),
  userActions
)(RightSidebarContainer);
