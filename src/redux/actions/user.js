import { openNotification } from "../../utils/helpers";
import socket from "../../core/socket";

const Actions = {
  setUserData: (data) => ({
    type: "USER:SET_DATA",
    payload: data,
  }),
  setIsAuth: (bool) => ({
    type: "USER:SET_IS_AUTH",
    payload: bool,
  }),
  fetchUserData: () => (dispatch) => {
    socket.emit("USER:GET_ME", { token: window.localStorage["token"] });
    return socket.on("USER:GET_ME", (data) => {
      if (data.status === 404) {
      }
      if (data.status === 401) {
        dispatch(Actions.setIsAuth(false));
        delete window.localStorage.token;
        delete window.localStorage.refreshToken;
      }
      if (data.status === 200) {
        dispatch(Actions.setUserData(data.me));
        return data.me;
      }
    });
  },

  fetchUserLogin: (postData) => (dispatch) => {
    socket.emit("USER:SIGNIN", postData);
    return socket.on("USER:SIGNIN", (data) => {
      if (data.status === 404 || data.status === 400) {
        openNotification({
          title: "Ошибка при авторизации",
          text: "Неверный логин или пароль",
          type: "error",
        });
        delete window.localStorage.token;
        delete window.localStorage.refreshToken;
      }
      if (data.status === 200) {
        openNotification({
          title: "Отлично!",
          text: "Авторизация успешна.",
          type: "success",
        });
        const { token, refreshToken } = data;
        window.axios.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        window.localStorage["token"] = token;
        window.localStorage["refreshToken"] = refreshToken;
        dispatch(Actions.fetchUserData());
        dispatch(Actions.setIsAuth(true));
        return data;
      }
    });
  },

  fetchUserRegister: (postData) => () => {
    socket.emit("USER:REGISTER", postData);
    return socket.on("USER:REGISTER", (data) => {
      return data;
    });
  },

  setFullname: (fullname) => (dispatch) => {
    socket.emit("USER:SET_FULLNAME", {
      token: window.localStorage.token,
      fullname,
    });
    return socket.on("USER:SET_FULLNAME", (data) => {
      if (data.status === 404) {
      }
      if (data.status === 401) {
        dispatch(Actions.setIsAuth(false));
        delete window.localStorage.token;
        delete window.localStorage.refreshToken;
      }
      if (data.status === 200) {
        dispatch(Actions.fetchUserData());
      }
    });
  },

  setAvatar: (avatar) => (dispatch) => {
    socket.emit("USER:SET_AVATAR", {
      token: window.localStorage.token,
      avatar,
    });
    return socket.on("USER:SET_AVATAR", (data) => {
      if (data.status === 404) {
      }
      if (data.status === 401) {
        dispatch(Actions.setIsAuth(false));
        delete window.localStorage.token;
        delete window.localStorage.refreshToken;
      }
      if (data.status === 200) {
        dispatch(Actions.fetchUserData());
      }
    });
  },

  logout: () => (dispatch) => {
    socket.emit("USER:LOGOUT", {
      token: window.localStorage.token,
      refreshToken: window.localStorage.refreshToken,
    });
    socket.on("USER:LOGOUT", (data) => {
      if (data.status === 200 || data.status === 401) {
        dispatch(Actions.setIsAuth(false));
        delete window.localStorage.token;
        delete window.localStorage.refreshToken;
      }
    });
  },
};

export default Actions;
