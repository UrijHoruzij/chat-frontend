import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Avatar.scss";

const Avatar = ({ avatar, name, size }) => (
  <div className="avatar">
    <img
      className={classNames("avatar__img", {
        "avatar__img--small": size === "small",
        "avatar__img--medium": size === "medium",
        "avatar__img--large": size === "large",
      })}
      src={avatar}
      alt={name}
    />
  </div>
);

Avatar.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
};

export default Avatar;
