import React from "react";
import PropTypes from "prop-types";

function RightSidebar({ user }) {
  return (
    <div className="right-sidebar">
      <Avatar user={user}></Avatar>
      <span className="right-sidebar__fullname">{useRef.fullname}</span>
    </div>
  );
}

RightSidebar.propTypes = {};

export default RightSidebar;
