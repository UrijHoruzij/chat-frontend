import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Status.scss";

const Status = ({ fullname, online }) => {
  return (
    <div className="status">
      <b className="status__username">{fullname}</b>
      <div
        className={classNames("status__online", {
          "status__online--isOnline": online,
        })}
      ></div>
    </div>
  );
};

Status.propTypes = {
  fullname: PropTypes.string,
  online: PropTypes.bool,
};

export default Status;
