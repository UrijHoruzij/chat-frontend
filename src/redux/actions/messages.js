import { userActions } from "./";
import socket from "../../core/socket";

const Actions = {
  setMessages: (items) => ({
    type: "MESSAGES:SET_ITEMS",
    payload: items,
  }),
  addMessage: (message) => (dispatch, getState) => {
    const { dialogs } = getState();
    const { currentDialogId } = dialogs;
    if (currentDialogId === message.dialog._id) {
      dispatch({
        type: "MESSAGES:ADD_MESSAGE",
        payload: message,
      });
    }
  },
  fetchSendMessage: ({ text, dialogId, attachments, audio }) => (dispatch) => {
    socket.emit("USER:CREATE_MESSAGE", {
      token: window.localStorage.token,
      text,
      dialogId,
      attachments,
      audio,
    });
    socket.on("USER:CREATE_MESSAGE", (data) => {
      if (data.status === 500) {
      }
      if (data.status === 404) {
      }
      if (data.status === 401) {
        dispatch(userActions.setIsAuth(false));
        delete window.localStorage.token;
        delete window.localStorage.refreshToken;
      }
      if (data.status === 200) {
      }
    });
  },
  setIsLoading: (bool) => ({
    type: "MESSAGES:SET_IS_LOADING",
    payload: bool,
  }),
  removeMessageById: (id) => (dispatch) => {
    socket.emit("USER:REMOVE_MESSAGE", {
      token: window.localStorage.token,
      id,
    });
    socket.on("USER:REMOVE_MESSAGE", (data) => {
      if (data.status === 500) {
      }
      if (data.status === 404) {
      }
      if (data.status === 403) {
      }
      if (data.status === 401) {
        dispatch(userActions.setIsAuth(false));
        delete window.localStorage.token;
        delete window.localStorage.refreshToken;
      }
      if (data.status === 200) {
        dispatch({
          type: "MESSAGES:REMOVE_MESSAGE",
          payload: id,
        });
      }
    });
  },

  fetchMessages: (dialogId) => (dispatch) => {
    dispatch(Actions.setIsLoading(true));
    socket.emit("USER:GET_MESSAGES", {
      token: window.localStorage.token,
      dialogId,
    });
    socket.on("USER:GET_MESSAGES", (data) => {
      if (data.status === 404) {
      }
      if (data.status === 401) {
        dispatch(userActions.setIsAuth(false));
        delete window.localStorage.token;
        delete window.localStorage.refreshToken;
      }
      if (data.status === 200) {
        dispatch(Actions.setMessages(data.messages));
      }
    });
  },
};

export default Actions;
