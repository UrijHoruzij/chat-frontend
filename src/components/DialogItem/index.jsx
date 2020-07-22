import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

import Avatar from "../Avatar";
import Time from "../Time";

const renderLastMessage = (message, userId) => {
  let text = "";
  if (!message.text && message.attachments.length) {
    text = "прикрепленный файл";
  } else {
    text = message.text;
  }

  return `${message.userId === userId ? "Вы: " : ""}${text}`;
};

const DialogsItem = ({ id, userId, partner, lastMessage, currentDialogId }) => {
  return (
    <Link className="dialogs-link" to={`/dialog/${id}`}>
      <div className="dialogs-item">
        <div
          className={classNames("dialogs-item__block", {
            "dialogs-item__block--selected": currentDialogId === id,
          })}
        >
          <div className="dialogs-item__avatar">
            <Avatar user={partner} size="small" />
          </div>

          <div className="dialogs-item-content">
            <div className="dialogs-item-content__partner-and-date">
              <h3 className="dialogs-item-content__partner">
                {partner.fullname}
              </h3>
              <span className="dialogs-item-content__date">
                <Time type="short" date={lastMessage.date} />
              </span>
            </div>
            <div className="dialogs-item-content__message-and-not-readed">
              <p className="dialogs-item-content__last-message">
                {renderLastMessage(lastMessage, userId)}
              </p>
              {!lastMessage.isReaded && (
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
  id: PropTypes.string,
  userId: PropTypes.string,
  partner: PropTypes.object,
  lastMessage: PropTypes.object,
  currentDialogId: PropTypes.string,
};

export default DialogsItem;
