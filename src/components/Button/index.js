import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Button.scss";

const Button = ({
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
    className={classNames("button", className, {
      "button--fill": styleBtn === "fill",
      "button--border": styleBtn === "border",
      "button--disabled": disabled,
      "button--small": size === "small",
      "button--medium": size === "medium",
      "button--large": size === "large",
    })}
  >
    {loading && <div className="button__progress-circle"></div>}
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  styleBtn: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Button;
