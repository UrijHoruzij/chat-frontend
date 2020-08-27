import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./CircleButton.scss";

const CircleButton = ({
  className,
  children,
  size,
  onClick,
  disabled,
  styleBtn,
  loading,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={classNames("button-circle", className, {
      "button-circle--fill": styleBtn === "fill",
      "button-circle--border": styleBtn === "border",
      "button-circle--disabled": disabled,
      "button-circle--small": size === "small",
      "button-circle--medium": size === "medium",
      "button-circle--large": size === "large",
    })}
  >
    {loading ? (
      <div className="button-circle__progress-circle"></div>
    ) : (
      children
    )}
  </button>
);

CircleButton.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  styleBtn: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default CircleButton;
