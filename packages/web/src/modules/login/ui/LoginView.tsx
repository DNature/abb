import React from "react";
import { loginSchema } from "@abb/common";
import { Form as AntForm, Icon, Button } from "antd";
import { withFormik, FormikProps, Field, Form } from "formik";
import { InputField } from "../../shared/InputField";
import { Link } from "react-router-dom";
import { NormalizedErrorMap } from '@abb/controller';

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  onFinish: () => void
  submit: (
    values: FormValues
  ) => Promise<NormalizedErrorMap | null>;
}
interface State {}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { values } = this.props;
    return (
      <Form style={{ display: "flex" }}>
        <div className="login-form" style={{ width: 400, margin: "auto" }}>
          <Field
            name="email"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
            component={InputField}
          />

          <Field
            name="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Password"
            type="password"
            component={InputField}
            isPassword={true}
          />

          <AntForm.Item>
            <Link className="login-form-forgot" to="forgot-password">
              Forgot password
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              disabled={!values.email || !values.password}
              loading={!values.email || !values.password}
            >
              Sign in
            </Button>
            Or <Link to="/register">Sign up!</Link>
          </AntForm.Item>
        </div>
      </Form>
    );
  }
}

export const LoginView = withFormik<Props, FormValues>({
  validationSchema: loginSchema,
  validateOnBlur: false,
  validateOnChange: false,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish()
    }
  }
})(C);
