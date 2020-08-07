import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { UploadField } from "@navjobs/upload";
import { Picker } from "emoji-mart";
import {
  SmileOutlined,
  PaperClipOutlined,
  SendOutlined,
  AudioOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { CircleButton, UploadFiles } from "../";

import "./ChatInput.scss";

const ChatInput = (props) => {
  const {
    emojiPickerVisible,
    value,
    addEmoji,
    setValue,
    handleSendMessage,
    sendMessage,
    toggleEmojiPicker,
    attachments,
    onSelectFiles,
    isRecording,
    onRecord,
    onHideRecording,
    removeAttachment,
    isLoading,
  } = props;
  return (
    <div className="chat-input">
      {attachments && attachments.length > 0 && (
        <div className="chat-input__attachments">
          <UploadFiles
            removeAttachment={removeAttachment}
            attachments={attachments}
          />
        </div>
      )}
      <div className="chat-input__block">
        <div className="chat-input__smile">
          <div className="chat-input__emoji-picker">
            {emojiPickerVisible && (
              <Picker onSelect={(emojiTag) => addEmoji(emojiTag)} set="apple" />
            )}
          </div>
          <CircleButton
            className="chat-input__smile-btn"
            onClick={toggleEmojiPicker}
          >
            <SmileOutlined className="chat-input__icon" />
          </CircleButton>
        </div>

        <div className="chat-input__upload">
          <UploadField
            onFiles={onSelectFiles}
            containerProps={{
              className: "chat-input__upload-field",
            }}
            uploadProps={{
              accept: ".jpg,.jpeg,.png,.gif,.bmp",
              multiple: "multiple",
              id: "upload",
            }}
          ></UploadField>
          <label htmlFor="upload" className="chat-input__upload-btn">
            <PaperClipOutlined className="chat-input__icon" />
          </label>
        </div>
        {isRecording ? (
          <div className="chat-input__record-status">
            Запись...
            <CircleButton onClick={onHideRecording} className="stop-recording">
              <CloseOutlined />
            </CircleButton>
          </div>
        ) : (
          <div className="chat-input__form">
            <Input
              className="chat-input__textarea"
              onChange={(e) => setValue(e.target.value)}
              onKeyUp={handleSendMessage}
              placeholder="Введите текст сообщения…"
              value={value}
            />
          </div>
        )}
        <div className="chat-input__send">
          {isLoading ? (
            <CircleButton className="chat-input__send-btn">
              <LoadingOutlined className="chat-input__icon" />
            </CircleButton>
          ) : isRecording || value || (attachments && attachments.length) ? ( //||
            <CircleButton
              className="chat-input__send-btn"
              onClick={sendMessage}
            >
              <SendOutlined className="chat-input__icon" />
            </CircleButton>
          ) : (
            <CircleButton className="chat-input__send-btn" onClick={onRecord}>
              <AudioOutlined className="chat-input__icon" />
            </CircleButton>
          )}
        </div>
      </div>
    </div>
  );
};

ChatInput.propTypes = {
  className: PropTypes.string,
};

export default ChatInput;
