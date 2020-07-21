import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Avatar.scss";

const Avatar = ({ user, size }) => (
  <div
    className={classNames("avatar", {
      "avatar--small": size === "small",
      "avatar--medium": size === "medium",
      "avatar--large": size === "large",
    })}
  >
    <img
      className={classNames("avatar__img", {
        "avatar__img--small": size === "small",
        "avatar__img--medium": size === "medium",
        "avatar__img--large": size === "large",
      })}
      src={user.avatar}
      alt={user.fullname}
    />
    {user.isOnline && (
      <div
        className={classNames("avatar__is-online", {
          "avatar__is-online--medium": size === "medium",
          "avatar__is-online--large": size === "large",
        })}
      ></div>
    )}
  </div>
);

Avatar.defaulProps = {
  user: {},
};

Avatar.propTypes = {
  user: PropTypes.object,
  size: PropTypes.string,
};

export default Avatar;
