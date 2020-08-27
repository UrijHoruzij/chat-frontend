import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import find from "lodash/find";

import { messagesActions } from "../redux/actions";
import socket from "../core/socket";

import { Messages as BaseMessages } from "../components";

const Messages = ({
  currentDialog,
  fetchMessages,
  addMessage,
  items,
  user,
  isLoading,
  removeMessageById,
  attachments,
}) => {
  const [removeMessage, setRemoveMessage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  let typingTimeoutId = null;

  const messagesRef = useRef(null);

  const onNewMessage = (data) => {
    addMessage(data);
  };

  const toggleIsTyping = () => {
    setIsTyping(true);
    clearInterval(typingTimeoutId);
    typingTimeoutId = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  };

  useEffect(() => {
    socket.on("DIALOGS:TYPING", (data) => {
      // eslint-disable-next-line eqeqeq
      if (currentDialog && data.dialogId == currentDialog._id) {
        toggleIsTyping();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDialog]);

  useEffect(() => {
    if (currentDialog) {
      fetchMessages(currentDialog._id);
    }

    socket.on("SERVER:NEW_MESSAGE", onNewMessage);

    return () => socket.removeListener("SERVER:NEW_MESSAGE", onNewMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDialog, fetchMessages]);

  useEffect(() => {
    if (items.length > 0 && currentDialog !== "") {
      if (typeof messagesRef.current.scrollTo === "function") {
        messagesRef.current.scrollTo(0, 999999);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, isTyping]);

  if (!currentDialog) {
    return (
      <div className="messages-info">
        <div className="messages-info__text">Откройте диалог</div>
      </div>
    );
  }

  return (
    <BaseMessages
      user={user}
      blockRef={messagesRef}
      items={items}
      isLoading={isLoading && !user}
      onRemoveMessage={removeMessageById}
      setPreviewImage={setPreviewImage}
      previewImage={previewImage}
      setRemoveMessage={setRemoveMessage}
      removeMessage={removeMessage}
      isTyping={isTyping}
      partner={
        user._id === currentDialog.partner._id
          ? currentDialog.author
          : currentDialog.partner
      }
    />
  );
};

export default connect(
  ({ dialogs, messages, user, attachments }) => ({
    currentDialog: find(dialogs.items, { _id: dialogs.currentDialogId }),
    items: messages.items,
    isLoading: messages.isLoading,
    attachments: attachments.items,
    user: user.data,
  }),
  messagesActions
)(Messages);
