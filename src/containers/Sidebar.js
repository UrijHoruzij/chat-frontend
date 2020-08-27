import React, { useState } from "react";
import { connect } from "react-redux";
import { userActions } from "../redux/actions";
import socket from "../core/socket";

import { Sidebar } from "../components";

const SidebarContainer = ({ user, setIsAuth }) => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messageText, setMessagaText] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  const onShow = () => {
    setVisible(true);
  };

  const onSearch = (value) => {
    setIsLoading(true);
    socket.emit("USER:FIND", {
      token: window.localStorage.token,
      email: value,
    });
    socket.on("USER:FIND", (data) => {
      if (data.status === 404) {
      }
      if (data.status === 401) {
        setIsLoading(false);
        setIsAuth(false);
        delete window.localStorage.token;
        delete window.localStorage.refreshToken;
      }
      if (data.status === 200) {
        setUsers(data.result);
        setIsLoading(false);
      }
    });
  };

  const onAddDialog = () => {
    socket.emit("USER:CREATE_DIALOG", {
      token: window.localStorage.token,
      partner: selectedUserId,
      text: messageText,
    });
    socket.on("USER:CREATE_DIALOG", (data) => {
      if (data.status === 500) {
        setIsLoading(false);
      }
      if (data.status === 403) {
        setIsLoading(false);
      }
      if (data.status === 401) {
        setIsLoading(false);
        setIsAuth(false);
        delete window.localStorage.token;
        delete window.localStorage.refreshToken;
      }
      if (data.status === 200) {
        onClose();
      }
    });
  };

  const handleChangeInput = (value) => {
    setInputValue(value);
  };

  const onChangeTextArea = (e) => {
    setMessagaText(e.target.value);
  };

  const onSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <Sidebar
      user={user}
      inputValue={inputValue}
      visible={visible}
      isLoading={isLoading}
      onClose={onClose}
      onShow={onShow}
      onSearch={onSearch}
      onChangeInput={handleChangeInput}
      onSelectUser={onSelectUser}
      onModalOk={onAddDialog}
      onChangeTextArea={onChangeTextArea}
      messageText={messageText}
      selectedUserId={selectedUserId}
      users={users}
    />
  );
};

export default connect(
  ({ user }) => ({ user: user.data }),
  userActions
)(SidebarContainer);
