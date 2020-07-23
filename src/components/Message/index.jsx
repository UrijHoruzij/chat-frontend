import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

import { convertCurrentTime, isAudio } from "../../utils";

import Avatar from "../Avatar";
import Time from "../Time";

import "./Message.scss";

import waveSvg from "../../assets/wave.svg";

library.add(faPause, faPlay);

const MessageAudio = ({ audioSrc }) => {
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
      const duration = (audioElem.current && audioElem.current.duration) || 0;
      setCurrentTime(audioElem.current.currentTime);
      setProgress((audioElem.current.currentTime / duration) * 100);
    });
  }, []);

  return (
    <div className="message__audio">
      <audio ref={audioElem} src={audioSrc} preload="auto" />
      <div
        className="message__audio-progress"
        style={{ width: progress + "%" }}
      />
      <div className="message__audio-content">
        <div className="message__audio-btn">
          <button onClick={togglePlay}>
            {isPlaying ? (
              <FontAwesomeIcon icon="pause" />
            ) : (
              <FontAwesomeIcon icon="play" />
            )}
          </button>
        </div>
        <div className="message__audio-wave">
          <img src={waveSvg} alt="Wave svg" />
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
}) => {
  const renderAttachment = (item) => {
    return (
      <div className="message__attachments-item">
        <img src={item.url} alt={item.filename} />
      </div>
    );
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
        <Avatar avatar={user.avatar} name={user.fullname} size="small" />
      </div>
      <div className="message__content">
        <div className="message__info">
          {(text || isTyping || audio) && (
            <div className="message__bubble">
              {text && <p className="message__text">{text}</p>}
              {isTyping && (
                <div className="message__typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
              {audio && <MessageAudio audioSrc={audio} />}
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
            <Time date={date} />
          </span>
        )}
      </div>
    </div>
  );
};

Message.defaultProps = {
  user: {},
};

Message.propTypes = {
  text: PropTypes.string,
  date: PropTypes.string,
  user: PropTypes.object,
  attachments: PropTypes.array,
  audio: PropTypes.string,
  isMe: PropTypes.bool,
  isReaded: PropTypes.bool,
  isTyping: PropTypes.bool,
};

export default Message;
