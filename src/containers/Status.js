import React, { useState } from "react";
import { Status as StatusBase } from "../components";
import { connect } from "react-redux";
import { dialogsActions } from "../redux/actions";

const Status = ({ currentDialogId, user, dialogs }) => {
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  const onShow = () => {
    setVisible(true);
  };

  const onRemove = (currentDialogId) => {
    dialogsActions.removeDialog(currentDialogId);
  };

  if (!dialogs.length || !currentDialogId) {
    return null;
  }

  const currentDialogObj = dialogs.filter(
    (dialog) => dialog._id === currentDialogId
  )[0];

  let partner = {};

  if (currentDialogObj.author._id === user._id) {
    partner = currentDialogObj.partner;
  } else {
    partner = currentDialogObj.author;
  }

  return (
    <StatusBase
      online={partner.isOnline}
      fullname={partner.fullname}
      onShow={onShow}
      onClose={onClose}
      onRemove={onRemove}
      visible={visible}
    />
  );
};

export default connect(({ dialogs, user }) => ({
  dialogs: dialogs.items,
  currentDialogId: dialogs.currentDialogId,
  user: user.data,
}))(Status);
