import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Icon, { CloseOutlined } from "@ant-design/icons";
import { Emoji } from "emoji-mart";
import reactStringReplace from "react-string-replace";

import { convertCurrentTime, isAudio } from "../../utils/helpers";

import { Avatar, Time, CircleButton, Modal, Button } from "../";

import "./Message.scss";

const waveSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
    width="110"
    height="31"
    viewBox="0 0 110 31"
  >
    <image
      id="wave"
      width="110"
      height="31"
      href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAAAfCAYAAAAGJfifAAABPElEQVRoge2XvRHCMAyFHzkPwCg03FHQsAsDsRFLUDICDRvQcGlsK4jIP8/RVzq27jnPluTd8XSBkgOAPYAHgNcPS7XzU1jESKGJm5ubGy+6tykaWeYG4A7gXGh+CosYKTRxc3Nz4yU0zPxjnNMBbhwpbhwpbhwpbhwpQZDN2PZbPRt60CHGkG4cY9tv9WzoQYcYQ7pxJRFPk7OMdONKIp4mZ5lAfPoZdZvVzon49DPqNqudrWpcbYarqVt5xw1XU/0BToobR4obR8pWmpPntzl5R19ICcSb0ui+RiNtWPuv5/Who01pYdS9VvO8vlWqHC511aaVcay3vBu8qyRFunHadGaR/syKd/SFT4cYQzJOm84s0p9Z8R5AhxjDUyUpbhwpbhwpbhwpUnOSQ+x2EvTQbVrEzc2t34EC+AAqEnFMhxnAlgAAAABJRU5ErkJggg=="
    />
  </svg>
);

const pauseSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
    width="17"
    height="16"
    viewBox="0 0 17 16"
  >
    <image
      id="pause-solid"
      width="17"
      height="16"
      href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAAkUlEQVQ4je3UwQoBYRSG4cekuARpLkF2ynYuRNnLhYi7kBuQlBWxs1AuRbJFf0ZT89csrCzmXZ1zvrdveRqDYdbCHH0FT+wwy/c2FuiVnG24NzHCVEyGPc4YYxIZH+eQII2igm4+daKkIE2i0w/UJTF1Scx/ldwr8m/2qHBuoWSFSyl4YYNjvi9xLTnhFaxxegMyPBc18emuvAAAAABJRU5ErkJggg=="
    />
  </svg>
);

const playSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
    width="15"
    height="17"
    viewBox="0 0 15 17"
  >
    <image
      id="play-solid"
      width="15"
      height="17"
      href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAA30lEQVQ4jZ3SoUtDURTH8c90zaSgZVlMi3OCIuy/sIlgciiC0WoZmASDCgbL+uqCmDRp1WqyjCVZUFCuvAe6dzfe9dvuOb8vnHvurTTWWnM4xAfO8a4kMzjCCTp4wVaKvPDrXEMXd6gX0hE5xiaecIb5SH+qHJjFfnaV3Vi2UIiwiCs8oJkq5zRwj2sspcqBCnbwjOVUOScsceO/8iN6qfIQe1jFoFpox/nCJY6DlCfKyGHD7ezT/GHa2G/YxnpMnCR/4hQruMlGjhLGDm+W08fBWG0iQb7AK0a4LSP9gG+deyVe+y87agAAAABJRU5ErkJggg=="
    />
  </svg>
);
const WaveIcon = (props) => <Icon component={waveSvg} {...props} />;
const PauseIcon = (props) => <Icon component={pauseSvg} {...props} />;
const PlayIcon = (props) => <Icon component={playSvg} {...props} />;

const MessageAudio = ({ audioSrc, isMe }) => {
  const audioElem = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (!isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  };

  useEffect(() => {
    audioElem.current.volume = "0.01";
    audioElem.current.addEventListener(
      "playing",
      () => {
        setIsPlaying(true);
      },
      false
    );
    audioElem.current.addEventListener(
      "ended",
      () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      },
      false
    );
    audioElem.current.addEventListener(
      "pause",
      () => {
        setIsPlaying(false);
      },
      false
    );
    audioElem.current.addEventListener("timeupdate", () => {
      console.log(audioElem.current.duration);
      const duration = (audioElem.current && audioElem.current.duration) || 0;
      setCurrentTime(audioElem.current.currentTime);
      setProgress((audioElem.current.currentTime / duration) * 100);
    });
  }, []);
  return (
    <div
      className={classNames("message__audio", { "message__audio--isme": isMe })}
    >
      <audio ref={audioElem} src={audioSrc} preload="metadata" />
      <div
        className="message__audio-progress"
        style={{ width: progress + "%" }}
      />
      <div className="message__audio-content">
        <div className="message__audio-btn">
          <button onClick={togglePlay}>
            {isPlaying ? (
              <PauseIcon className="message__audio-btn-icon" />
            ) : (
              <PlayIcon className="message__audio-btn-icon" />
            )}
          </button>
        </div>
        <div className="message__audio-wave">
          <WaveIcon />
        </div>
        <span className="message__audio-duration">
          {convertCurrentTime(currentTime)}
        </span>
      </div>
    </div>
  );
};

const Message = ({
  user,
  text,
  attachments,
  date,
  audio,
  isMe,
  isTyping,
  isReaded,
  onRemoveMessage,
  setPreviewImage,
  setRemoveMessage,
  removeMessage,
}) => {
  const renderAttachment = (item) => {
    if (item.ext !== "webm") {
      return (
        <div
          key={item._id}
          onClick={() => setPreviewImage(item.url)}
          className="message__attachments-item"
        >
          {isMe && (
            <CircleButton
              className="button--color message__btn-remove"
              onClick={setRemoveMessage}
            >
              <CloseOutlined className="message__btn-remove-icon" />
            </CircleButton>
          )}
          {/* <div className="message__attachments-item-overlay">
            <Icon type="eye" style={{ color: "white", fontSize: 18 }} />
          </div> */}

          <img src={item.url} alt={item.filename} />
        </div>
      );
    }
  };

  return (
    <div
      className={classNames("message", {
        "message--isme": isMe,
        "message--is-typing": isTyping,
        "message--is-audio": isAudio(attachments),
        "message--image":
          !isAudio(attachments) &&
          attachments &&
          attachments.length === 1 &&
          !text,
      })}
    >
      <div className="message__avatar">
        <Avatar user={user} size="small" />
      </div>
      <div className="message__content">
        <div className="message__info">
          {(text || isTyping || audio) && (
            <div className="message__bubble">
              {isMe && (
                <CircleButton
                  className="button--color message__btn-remove"
                  onClick={setRemoveMessage}
                >
                  <CloseOutlined className="message__btn-remove-icon" />
                </CircleButton>
              )}
              {text && (
                <p className="message__text">
                  {reactStringReplace(text, /:(.+?):/g, (match, i) => (
                    <Emoji key={i} emoji={match} set="apple" size={20} />
                  ))}
                </p>
              )}
              {isTyping && (
                <div className="message__typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
              {audio && <MessageAudio isMe={isMe} audioSrc={audio.url} />}
            </div>
          )}
        </div>

        {attachments && (
          <div
            className={classNames("message__attachments", {
              "message__attachments--isme":
                !isAudio(attachments) &&
                attachments &&
                attachments.length === 1 &&
                !text &&
                isMe,
            })}
          >
            {attachments.map((item) => renderAttachment(item))}
          </div>
        )}
        {date && (
          <span className="message__date">
            <Time date={new Date(date)} />
          </span>
        )}
      </div>

      <Modal
        visible={!!removeMessage}
        title="Вы действительно хотите удалить сообщение?"
        onCancel={() => setRemoveMessage(null)}
        footer={[
          <Button
            size="small"
            styleBtn="border"
            key="back"
            onClick={() => setRemoveMessage(null)}
          >
            Закрыть
          </Button>,
          <Button
            styleBtn="fill"
            size="small"
            key="submit"
            onClick={() => {
              onRemoveMessage();
              setRemoveMessage(null);
            }}
          >
            Удалить
          </Button>,
        ]}
      ></Modal>
    </div>
  );
};

Message.defaultProps = {
  user: {},
};

Message.propTypes = {
  text: PropTypes.string,
  user: PropTypes.object,
  attachments: PropTypes.array,
  audio: PropTypes.object,
  isMe: PropTypes.bool,
  isReaded: PropTypes.bool,
  isTyping: PropTypes.bool,
};

export default Message;
