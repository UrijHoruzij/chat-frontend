import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Message from "../Message";

const Messages = () => {
  return (
    <div>
      <Message></Message>
    </div>
  );
};

Messages.propTypes = {
  items: PropTypes.array,
};

export default Messages;
