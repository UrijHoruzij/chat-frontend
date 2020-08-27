import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal } from "../";

import "./Status.scss";

const Status = ({ fullname, online, visible, onShow, onClose, onRemove }) => {
  return (
    <div className="status">
      <div className="status__block">
        <b className="status__username">{fullname}</b>
        <div
          className={classNames("status__online", {
            "status__online--isOnline": online,
          })}
        ></div>
      </div>
      <div className="status__remove" onClick={onShow}>
        <CloseOutlined />
      </div>
      <Modal
        title="Удалить диалог"
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button size="small" styleBtn="border" key="back" onClick={onClose}>
            Отмена
          </Button>,
          <Button styleBtn="fill" size="small" key="submit" onClick={onRemove}>
            Удалить
          </Button>,
        ]}
      ></Modal>
    </div>
  );
};

Status.propTypes = {
  fullname: PropTypes.string,
  online: PropTypes.bool,
};

export default Status;
