import React, { useState } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";
import { Avatar, Modal, Button } from "../";
import { UploadField } from "@navjobs/upload";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";

import "./RightSidebar.scss";

const RightSidebar = ({
  user,
  onExit,
  visible,
  onClose,
  onShow,
  onSelectFile,
  onSave,
  userName,
  onChangeInput,
}) => {
  const [previewExit, setPreviewExit] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(false);
  // const [previewImage, setPreviewImage] = useState(null);
  return (
    <div className="right-sidebar">
      <div className="right-sidebar__profile-block">
        <Avatar
          className="right-sidebar__avatar"
          user={user}
          size="large"
          onClick={() => setPreviewAvatar(true)}
        ></Avatar>
        <span className="right-sidebar__fullname">{user.fullname}</span>
        <div className="right-sidebar__menu">
          <li className="right-sidebar__menu-item" onClick={() => onShow()}>
            <span className="right-sidebar__menu-item__text">Настройки</span>
            <SettingOutlined className="right-sidebar__menu-item__img" />
          </li>
          <li
            className="right-sidebar__menu-item"
            onClick={() => setPreviewExit(true)}
          >
            <span className="right-sidebar__menu-item__text">Выход</span>
            <LogoutOutlined className="right-sidebar__menu-item__img" />
          </li>
        </div>
      </div>
      <Modal
        visible={previewAvatar}
        onCancel={() => setPreviewAvatar(false)}
        title="Изменить аватар"
        footer={null}
        btnClose={true}
        isImage={false}
      >
        <UploadField
          onFiles={onSelectFile}
          containerProps={{
            className: "right-sidebar__upload-field",
          }}
          uploadProps={{
            accept: ".jpg,.jpeg,.png,.gif,.bmp",
          }}
        >
          <Avatar user={user} size="large"></Avatar>
        </UploadField>
      </Modal>
      <Modal
        visible={visible}
        onCancel={() => onClose()}
        title="Настройки"
        footer={[
          <Button
            size="small"
            styleBtn="border"
            onClick={() => onClose()}
            key="back-settings"
          >
            Отмена
          </Button>,
          <Button
            styleBtn="fill"
            size="small"
            onClick={() => onSave()}
            key="save-settings"
          >
            Сохранить
          </Button>,
        ]}
        btnClose={false}
        isImage={false}
      >
        <Form className="right-sidebar__settings">
          <Form.Item label="Ваше имя">
            <Input
              id="fullname"
              size="large"
              placeholder="Ваше имя"
              onChange={onChangeInput}
              value={userName}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={previewExit}
        onCancel={() => setPreviewExit(false)}
        title="Выход"
        footer={[
          <Button
            size="small"
            styleBtn="border"
            onClick={() => setPreviewExit(false)}
            key="back"
          >
            Отмена
          </Button>,
          <Button
            styleBtn="fill"
            size="small"
            onClick={() => onExit()}
            key="exit"
          >
            Выйти
          </Button>,
        ]}
        btnClose={false}
        isImage={false}
      >
        Вы хотите выйти?
      </Modal>
      {/* <span className="right-sidebar__shared-title">
        Загруженные фотографии
      </span>
      <div className="right-sidebar__shared-block">
        <div className="right-sidebar__shared-documents">
         
          
        </div>
        <span className="right-sidebar__shared-all">Показать все</span>
        {shared &&
          shared.lenght > 0 &&
          shared.map((item) => (
            <SharedImage
              image={item.url}
              description={item.filename}
              key={item._id}
            />
          ))}
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
      </div> */}
    </div>
  );
};

RightSidebar.defaulProps = {
  user: {},
};
RightSidebar.propTypes = {
  user: PropTypes.object,
  onExit: PropTypes.func,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onShow: PropTypes.func,
  onSelectFile: PropTypes.func,
  onSave: PropTypes.func,
  userName: PropTypes.string,
  onChangeInput: PropTypes.func,
};

export default RightSidebar;
