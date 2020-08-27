import { withFormik } from "formik";
import socket from "../../../core/socket";
import LoginForm from "../components/LoginForm";
import validateForm from "../../../utils/validate";
import { userActions } from "../../../redux/actions";
import store from "../../../redux/store";

const LoginFormContainer = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
  validate: (values) => {
    let errors = {};
    validateForm({ isAuth: true, values, errors });
    return errors;
  },
  handleSubmit: (values, { setSubmitting, props }) => {
    store.dispatch(userActions.fetchUserLogin(values));
    socket.on("USER:SIGNIN", (data) => {
      if (data.status === 200) {
        props.history.push("/");
      }
    });
    setSubmitting(false);
  },
  displayName: "LoginForm",
})(LoginForm);

export default LoginFormContainer;
