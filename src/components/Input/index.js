import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Input = ({
  id,
  prefix,
  type,
  className,
  onChange,
  onKeyUp,
  placeholder,
  value,
  onBlur,
}) => {
  return (
    <div className="form-item__block">
      {prefix && <div className="form-item__prefix">{prefix}</div>}
      <input
        id={id}
        className={classNames("form-item__input", className)}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
      ></input>
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;
