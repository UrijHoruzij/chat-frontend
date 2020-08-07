import React from "react";
import PropTypes from "prop-types";

import { Avatar } from "../";

function RightSidebar({ user, settings, edit }) {
  return (
    <div className="right-sidebar">
      <div className="right-sidebar__block">
        <Avatar user={user}></Avatar>
        <span className="right-sidebar__fullname">{user.fullname}</span>
        <div className="right-sidebar__menu"></div>
      </div>
      <div className="right-sidebar__shared-image"></div>
    </div>
  );
}

RightSidebar.propTypes = {};

export default RightSidebar;
