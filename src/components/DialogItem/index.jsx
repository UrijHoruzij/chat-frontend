import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import isToday from "date-fns/isToday";
import { Emoji } from "emoji-mart";
import reactStringReplace from "react-string-replace";

import Avatar from "../Avatar";

const getUTCDate = (dateString = Date.now()) => {
  const date = new Date(dateString);

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
};

const getMessageTime = (date) => {
  if (isToday(date)) {
    return format(date, "HH:mm");
  } else {
    return format(date, "dd.MM.yyyy");
  }
};

const renderLastMessage = (message, userId) => {
  let text = "";
  if (!message.text && message.attachments && message.attachments.length) {
    text = "прикрепленный файл";
  }
  if (message.audio) {
    text = "аудиозапись";
  }
  return `${text}`;
};

const DialogsItem = ({
  _id,
  isReaded,
  isMe,
  currentDialogId,
  partner,
  author,
  lastMessage,
  userId,
}) => {
  return (
    <Link className="dialogs-link" to={`/dialog/${_id}`}>
      <div className="dialogs-item">
        <div
          className={classNames("dialogs-item__block", {
            "dialogs-item__block--selected": currentDialogId === _id,
          })}
        >
          <div className="dialogs-item__avatar">
            {partner._id === userId ? (
              <Avatar user={author} size="small" />
            ) : (
              <Avatar user={partner} size="small" />
            )}
          </div>
          <div className="dialogs-item-content">
            <div className="dialogs-item-content__partner-and-date">
              <h3 className="dialogs-item-content__partner">
                {partner._id === userId ? author.fullname : partner.fullname}
              </h3>
              <span className="dialogs-item-content__date">
                {getMessageTime(getUTCDate(lastMessage.date))}
              </span>
            </div>
            <div className="dialogs-item-content__message-and-not-readed">
              <p className="dialogs-item-content__last-message">
                {lastMessage.user._id === userId ? "Вы: " : ""}
                {reactStringReplace(
                  lastMessage.text,
                  /:(.+?):/g,
                  (match, i) => (
                    <Emoji key={i} emoji={match} set="apple" size={16} />
                  )
                )}
                {renderLastMessage(lastMessage, userId)}
              </p>
              {lastMessage.count > 0 && (
                <div className="dialogs-item-content__not-readed">
                  {lastMessage.count > 9 ? "+9" : lastMessage.count}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

DialogsItem.defaultProps = {
  partner: {},
  lastMessage: {},
};

DialogsItem.propTypes = {
  _id: PropTypes.string,
  userId: PropTypes.string,
  partner: PropTypes.object,
  lastMessage: PropTypes.object,
  currentDialogId: PropTypes.string,
};

export default DialogsItem;
