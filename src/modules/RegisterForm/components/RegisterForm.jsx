import React from "react";
import { Form, Input } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button } from "../../../components";
import { validateField } from "../../../utils/helpers";

const success = false;

const RegisterForm = (props) => {
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
      {!success ? (
        <div>
          <div className="auth__top">
            <h2>Зарегистрироваться</h2>
            <p>Для входа в чат, вам нужно зарегистрироваться</p>
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
                validateStatus={validateField("fullname", touched, errors)}
                help={!touched.fullname ? "" : errors.fullname}
                hasFeedback
                className="form-item"
              >
                <Input
                  id="fullname"
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  size="large"
                  placeholder="Ваше имя и фамилия"
                  value={values.fullname}
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
              <Form.Item
                validateStatus={validateField("password_2", touched, errors)}
                help={!touched.password_2 ? "" : errors.password_2}
                hasFeedback
                className="form-item"
              >
                <Input
                  id="password_2"
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  size="large"
                  type="password"
                  placeholder="Повторите пароль"
                  value={values.password_2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-input"
                />
              </Form.Item>
              <Form.Item className="form-item">
                {isSubmitting && !isValid && <span>Ошибка!</span>}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  styleBtn="fill"
                  size="large"
                  className="form-button"
                >
                  Зарегистрироваться
                </Button>
              </Form.Item>
              <Link className="auth__register-link" to="/signin">
                Войти в аккаунт
              </Link>
            </Form>
          </div>
        </div>
      ) : (
        <div className="auth__success-block">
          <div>
            <InfoCircleOutlined
              style={{ fontSize: "48px", color: "#ffcf8a" }}
            />
          </div>
          <h2>Подтвердите свой аккаунт</h2>
          <p>
            На Вашу почту отправлено письмо с ссылкой на подтверждение аккаунта.
          </p>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
