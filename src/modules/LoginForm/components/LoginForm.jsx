import React from "react";
import { Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button } from "../../../components";
import { validateField } from "../../../utils/helpers";

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
      <div className="auth__top">
        <h2>Войти в аккаунт</h2>
        <p>Пожалуйста, войдите в свой аккаунт</p>
      </div>
      <div className="block">
        <Form onSubmit={handleSubmit} className="form">
          <Form.Item
            validateStatus={validateField("email", touched, errors)}
            help={!touched.email ? "" : errors.email}
            hasFeedback
            className="form-item"
          >
            <Input
              id="email"
              prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              size="large"
              placeholder="E-Mail"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-input"
            />
          </Form.Item>
          <Form.Item
            validateStatus={validateField("password", touched, errors)}
            help={!touched.password ? "" : errors.password}
            hasFeedback
            className="form-item"
          >
            <Input
              id="password"
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              size="large"
              type="password"
              placeholder="Пароль"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-input"
            />
          </Form.Item>
          <Form.Item className="form-item">
            {isSubmitting && !isValid && <span>Ошибка!</span>}
            <Button
              disabled={isSubmitting}
              onClick={handleSubmit}
              size="large"
              className="button--color form-button"
            >
              Войти в аккаунт
            </Button>
          </Form.Item>
          <Link className="auth__register-link" to="/signup">
            Зарегистрироваться
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
