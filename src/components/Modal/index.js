import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { CloseOutlined } from "@ant-design/icons";

import { CircleButton } from "../";
import "./Modal.scss";

const Modal = ({
  children,
  title,
  visible,
  onCancel,
  btnClose,
  footer,
  isImage,
}) => {
  return (
    <div className={classNames("modal", { "modal--visible": visible })}>
      {visible && (
        <div className="modal-visible">
          <div className="modal-overlay"></div>
          <div
            className={classNames("modal-block", {
              "modal-block--image": isImage,
            })}
          >
            {btnClose && (
              <div className="modal-block__close">
                <CircleButton
                  styleBtn="fill"
                  size="small"
                  onClick={onCancel}
                  className="modal-block__close-btn"
                >
                  <CloseOutlined />
                </CircleButton>
              </div>
            )}
            <div className="modal-block__title">{title}</div>
            <div className="modal-block__content">{children}</div>
            <div className="modal-block__footer">
              {footer && footer.length > 0
                ? footer.map((item) => (
                    <div key={item._id} className="modal-block__footer-item">
                      {item}
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  btnClose: PropTypes.bool,
  isImage: PropTypes.bool,
};

export default Modal;
