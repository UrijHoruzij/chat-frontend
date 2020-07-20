import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./CircleButton.scss";

library.add(faPlus);

const CircleButton = ({ icon, size, color, border }) => {
  return (
    <button
      className={classNames(
        "button-circle",
        {
          "button-circle--small": size === "small",
          "button-circle--medium": size === "medium",
          "button-circle--large": size === "large",
        },
        {
          "button-circle--border-green": border === "green",
          "button-circle--border-grey": border === "grey",
        },
        {
          "button-circle--green": color === "green",
        }
      )}
    >
      <FontAwesomeIcon className="white" icon={icon} />
    </button>
  );
};

CircleButton.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.string,
};

export default CircleButton;
