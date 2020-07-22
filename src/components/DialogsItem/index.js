import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Avatar from "../Avatar";
import Time from "../Time";

import "./DialogsItem.scss";

const DialogsItem = ({ partner, lastMessage, isSelected }) => {
  return (
    <div className="dialogs-item">
      <div
        className={classNames("dialogs-item__block", {
          "dialogs-item__block--selected": isSelected,
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
              {lastMessage.text}
            </p>
            {!lastMessage.isReaded && !isSelected && (
              <div className="dialogs-item-content__not-readed">
                {lastMessage.count}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

DialogsItem.defaultProps = {
  partner: {},
  lastMessage: {},
};

DialogsItem.propTypes = {
  partner: PropTypes.object,
  lastMessage: PropTypes.object,
  isSelected: PropTypes.bool,
};

export default DialogsItem;
