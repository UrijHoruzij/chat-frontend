import React from "react";
import { Link } from "react-router-dom";

const LoginForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
  } = props;
  return (
    <div>
      <h1>hello</h1>
      <Link className="auth__register-link" to="/signin">
        Войти в аккаунт
      </Link>
    </div>
  );
};

export default LoginForm;
