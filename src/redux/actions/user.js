import { openNotification } from "../../utils/helpers";
import { userApi } from "../../utils/api";

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
    userApi
      .getMe()
      .then(({ data }) => {
        dispatch(Actions.setUserData(data));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          if (window.localStorage["refreshToken"]) {
            userApi
              .refresh()
              .then(({ refreshData }) => {
                const { token, refreshToken } = refreshData;
                window.axios.defaults.headers.common["Authorization"] =
                  "Bearer " + token;
                window.localStorage["token"] = token;
                window.localStorage["refreshToken"] = refreshToken;
                dispatch(Actions.fetchUserData());
              })
              .catch(() => {
                dispatch(Actions.setIsAuth(false));
                delete window.localStorage.token;
                delete window.localStorage.refreshToken;
              });
          }
          dispatch(Actions.setIsAuth(false));
          delete window.localStorage.token;
          delete window.localStorage.refreshToken;
        }
      });
  },
  fetchUserLogin: (postData) => (dispatch) => {
    return userApi
      .signIn(postData)
      .then(({ data }) => {
        const { token, refreshToken } = data;
        openNotification({
          title: "Отлично!",
          text: "Авторизация успешна.",
          type: "success",
        });
        window.axios.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        window.localStorage["token"] = token;
        window.localStorage["refreshToken"] = refreshToken;
        dispatch(Actions.fetchUserData());
        dispatch(Actions.setIsAuth(true));
        return data;
      })
      .catch(({ response }) => {
        openNotification({
          title: "Ошибка при авторизации",
          text: "Неверный логин или пароль",
          type: "error",
        });
      });
  },
  fetchUserRegister: (postData) => () => {
    return userApi.signUp(postData);
  },
};

export default Actions;
