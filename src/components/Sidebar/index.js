import React from "react";
import { Select, Input, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CircleButton, Button, Modal } from "../";
import { Dialogs } from "../../containers";

import "./Sidebar.scss";

const { Option } = Select;
const { TextArea } = Input;

const Sidebar = ({
  user,
  visible,
  inputValue,
  messageText,
  selectedUserId,
  isLoading,
  users,
  onShow,
  onClose,
  onSearch,
  onChangeInput,
  onSelectUser,
  onChangeTextArea,
  onModalOk,
}) => {
  const options = users.map((user) => (
    <Option key={user._id}>{user.email}</Option>
  ));
  return (
    <div className="sidebar">
      <Dialogs userId={user && user._id} />
      <div className="sidebar__footer">
        <CircleButton
          className="sidebar-btn-add"
          styleBtn="fill"
          size="medium"
          onClick={onShow}
        >
          <PlusOutlined />
        </CircleButton>
      </div>

      <Modal
        title="Создать диалог"
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button size="small" styleBtn="border" key="back" onClick={onClose}>
            Закрыть
          </Button>,
          <Button
            styleBtn="fill"
            size="small"
            disabled={!messageText}
            key="submit"
            loading={isLoading}
            onClick={onModalOk}
          >
            Создать
          </Button>,
        ]}
      >
        <Form className="add-dialog-form">
          <Form.Item label="Введите E-Mail пользователя">
            <Select
              value={inputValue}
              onSearch={onSearch}
              onChange={onChangeInput}
              onSelect={onSelectUser}
              notFoundContent={null}
              style={{ width: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              placeholder="Введите E-Mail пользователя"
              showSearch
            >
              {options}
            </Select>
          </Form.Item>
          {selectedUserId && (
            <Form.Item label="Введите текст сообщения">
              <TextArea
                autosize={{ minRows: 3, maxRows: 10 }}
                onChange={onChangeTextArea}
                value={messageText}
                className="add-dialog-form__textarea"
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

Sidebar.defaultProps = {
  users: [],
};

export default Sidebar;
