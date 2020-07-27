import React from "react";
import PropTypes from "prop-types";
import orderBy from "lodash/orderBy";
import { Input } from "antd";
import { ExceptionOutlined } from "@ant-design/icons";

import DialogItem from "../DialogItem";

import "./Dialogs.scss";

const Dialogs = ({ items, userId, currentDialogId, onSearch, inputValue }) => {
  return (
    <div className="dialogs">
      <div className="dialogs__search">
        <Input.Search
          placeholder="Поиск среди контактов"
          className="dialogs__search-input"
          onChange={(e) => onSearch(e.target.value)}
          value={inputValue}
        />
      </div>
      {items.length ? (
        orderBy(items, ["date"], ["desc"]).map((item) => (
          <DialogItem
            key={item._id}
            userId={userId}
            currentDialogId={currentDialogId}
            {...item}
          />
        ))
      ) : (
        <div className="dialogs-info">
          <div className="dialogs-info__image">
            <ExceptionOutlined />
          </div>
          <div className="dialogs-info__text">Ничего не найдено</div>
        </div>
      )}
    </div>
  );
};

Dialogs.defaultProps = {
  items: [],
};

Dialogs.propTypes = {
  items: PropTypes.array,
  userId: PropTypes.string,
  currentDialogId: PropTypes.string,
};

export default Dialogs;
