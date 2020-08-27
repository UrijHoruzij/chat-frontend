import React from "react";
import PropTypes from "prop-types";

import "./SharedImage.scss";

function SharedImage({ image, description, onClick }) {
  return (
    <div>
      {/* <img
        src="https://images.unsplash.com/photo-1596886173692-2535bbf929e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        className="shared-document"
        alt="111"
        onClick={() =>
          setPreviewImage(
            "https://images.unsplash.com/photo-1596886173692-2535bbf929e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          )
        }
      ></img> */}
      <img
        src={image}
        className="shared-document"
        alt={description}
        onClick={onClick}
      ></img>
    </div>
  );
}

SharedImage.propTypes = {
  image: PropTypes.string,
  description: PropTypes.string,
};

export default SharedImage;
