import socket from "../../core/socket";
import { userActions } from "./";

const Actions = {
  setDialogs: (items) => ({
    type: "DIALOGS:SET_ITEMS",
    payload: items,
  }),
  updateReadedStatus: ({ userId, dialogId }) => ({
    type: "DIALOGS:LAST_MESSAGE_READED_STATUS",
    payload: {
      userId,
      dialogId,
    },
  }),
  setCurrentDialogId: (id) => (dispatch) => {
    socket.emit("DIALOGS:JOIN", id);
    dispatch({
      type: "DIALOGS:SET_CURRENT_DIALOG_ID",
      payload: id,
    });
  },
  removeDialog: (currentDialogId) => (dispatch) => {
    socket.emit("USER:REMOVE_DIALOG", {
      token: window.localStorage.token,
      dialog: currentDialogId,
    });
    socket.on("USER:REMOVE_DIALOG", (data) => {
      if (data.status === 404) {
      }
      if (data.status === 401) {
        dispatch(userActions.setIsAuth(false));
        delete window.localStorage.token;
        delete window.localStorage.refreshToken;
      }
      if (data.status === 200) {
        this.fetchDialogs();
      }
    });
  },
  fetchDialogs: () => (dispatch) => {
    socket.emit("USER:GET_DIALOGS", { token: window.localStorage.token });
    socket.on("USER:GET_DIALOGS", (data) => {
      if (data.status === 404) {
      }
      if (data.status === 401) {
        dispatch(userActions.setIsAuth(false));
        delete window.localStorage.token;
        delete window.localStorage.refreshToken;
      }
      if (data.status === 200) {
        dispatch(Actions.setDialogs(data.dialogs));
      }
    });
  },
};

export default Actions;
