import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const FormItem = ({
  validateStatus,
  help,
  hasFeedback,
  className,
  children,
}) => {
  return (
    <div className={classNames("form-item", className)}>
      {children}
      <div className="form-item__explain"></div>
    </div>
  );
};

FormItem.propTypes = {};

export default FormItem;
