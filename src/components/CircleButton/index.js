import React from "react";
import PropTypes from "prop-types";
import { Button as BaseButton } from "antd";
import classNames from "classnames";

import "./CircleButton.scss";

const CircleButton = (props) => {
  return (
    <BaseButton
      {...props}
      className={classNames("button-circle", props.className, {
        "button-circle--small": props.size === "small",
        "button-circle--medium": props.size === "medium",
        "button-circle--large": props.size === "large",
      })}
    />
  );
};

CircleButton.propTypes = {
  classNames: PropTypes.string,
  size: PropTypes.string,
};

export default CircleButton;
