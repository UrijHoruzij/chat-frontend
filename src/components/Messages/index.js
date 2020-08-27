import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Modal, Message } from "../";
import { LoadingOutlined } from "@ant-design/icons";

import "./Messages.scss";

const Messages = ({
  blockRef,
  isLoading,
  items,
  user,
  partner,
  isTyping,
  previewImage,
  removeMessage,
  setRemoveMessage,
  setPreviewImage,
  onRemoveMessage,
}) => {
  return (
    <div className="chat__dialog-messages">
      <div
        ref={blockRef}
        className={classNames("messages", { "messages--loading": isLoading })}
      >
        {isLoading && !user ? (
          <div className="messages-info">
            <div className="messages-info__image">
              <LoadingOutlined />
            </div>
            <div className="messages-info__text">Загрузка сообщений...</div>
          </div>
        ) : items && !isLoading ? (
          items.length > 0 ? (
            items.map((item) => (
              <Message
                {...item}
                isMe={user._id === item.user._id}
                removeMessage={removeMessage}
                setRemoveMessage={setRemoveMessage}
                onRemoveMessage={onRemoveMessage.bind(this, item._id)}
                setPreviewImage={setPreviewImage}
                key={item._id}
              />
            ))
          ) : (
            <div className="messages-info">
              <div className="messages-info__text">Диалог пуст</div>
            </div>
          )
        ) : (
          <div className="messages-info">
            <div className="messages-info__text">Откройте диалог</div>
          </div>
        )}
        {isTyping && <Message isTyping={true} user={partner} />}
        <Modal
          visible={!!previewImage}
          onCancel={() => setPreviewImage(null)}
          footer={null}
          btnClose={true}
          isImage={true}
        >
          <img
            className="modal-block__image"
            src={previewImage}
            style={{ width: "100%" }}
            alt="Preview"
          />
        </Modal>
      </div>
    </div>
  );
};

Messages.propTypes = {
  items: PropTypes.array,
};

export default Messages;
