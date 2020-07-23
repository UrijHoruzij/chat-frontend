import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Message from "../Message";

import "./Messages.scss";

const Messages = ({
  blockRef,
  isLoading,
  items,
  user,
  partner,
  isTyping,
  previewImage,
  setPreviewImage,
  onRemoveMessage,
  blockHeight,
}) => {
  return (
    <div
      className="chat__dialog-messages"
      style={{ height: `calc(100% - ${blockHeight}px)` }}
    >
      <div
        ref={blockRef}
        className={classNames("messages", { "messages--loading": isLoading })}
      >
        {isLoading && !user ? (
          <div className="messages-info">
            <div className="messages-info__image">
              <svg class="spinner" viewBox="0 0 50 50">
                <circle
                  class="path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke-width="5"
                ></circle>
              </svg>
            </div>
            <div className="messages-info__text">Загрузка сообщений...</div>
          </div>
        ) : items && !isLoading ? (
          items.length > 0 ? (
            items.map((item) => (
              <Message
                {...item}
                isMe={user._id === item.user._id}
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
        {/* <Modal visible={!!previewImage} onCancel={() => setPreviewImage(null)} footer={null}>
          <img src={previewImage} style={{ width: '100%' }} alt="Preview" />
        </Modal> */}
      </div>
    </div>
  );
};

Messages.propTypes = {
  items: PropTypes.array,
};

export default Messages;
