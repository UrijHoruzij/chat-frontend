import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Avatar from "../Avatar";

const DialogItem = ({ avatar, partner, lastMessage, isSelected, isOnline }) => {
  return (
    <div
      className={classNames("dialogs-item", {
        "dialogs-item--selected": isSelected,
      })}
    >
      <Avatar
        className="dialogs-item__avatar"
        size="small"
        avatar={avatar}
        name={partner}
        isOnline
      />
      <div className="dialogs-item-content">
        <h3 className="dialogs-item-content__partner">{partner}</h3>
        <p className="dialogs-item-content__last-message">{lastMessage.text}</p>
        <span className="dialogs-item-content__date">{lastMessage.date}</span>
        <div className="dialogs-item-content__not-readed">
          {lastMessage.isReaded}
        </div>
      </div>
    </div>
  );
};

DialogItem.defaultProps = {
  lastMessage: {},
};

DialogItem.propTypes = {
  avatar: PropTypes.string,
  partner: PropTypes.string,
  lastMessage: PropTypes.object,
  isSelected: PropTypes.bool,
};

export default DialogItem;
