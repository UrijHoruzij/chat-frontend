import { withFormik } from "formik";
import RegisterForm from "../components/RegisterForm";
import socket from "../../../core/socket";
import validateForm from "../../../utils/validate";
import { openNotification } from "../../../utils/helpers";
import store from "../../../redux/store";

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: "",
    fullname: "",
    password: "",
    password_2: "",
  }),
  validate: (values) => {
    let errors = {};
    validateForm({ isAuth: false, values, errors });
    return errors;
  },
  handleSubmit: (values, { setSubmitting, props }) => {
    socket.emit("USER:SIGNUP", values);
    socket.on("USER:SIGNUP", (data) => {
      if (data.status === 500) {
        openNotification({
          title: "Ошибка",
          text: "Возникла серверная ошибка при регистрации. Повторите позже.",
          type: "error",
          duration: 5000,
        });
      }
      if (data.status === 400) {
        openNotification({
          title: "Ошибка",
          text: "Аккаунт с такой почтой уже создан.",
          type: "error",
          duration: 5000,
        });
      }
      if (data.status === 201) {
        store.dispatch({ type: "USER:SIGNUP", payload: data });
        props.history.push("/signin");
      }
      setSubmitting(false);
    });
  },
  displayName: "RegisterForm",
})(RegisterForm);
