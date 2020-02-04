import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { withFormik, FormikErrors, FormikProps } from "formik";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}
interface State {}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { values, handleSubmit, handleBlur, handleChange } = this.props;
    return (
      <div style={{ display: "flex" }}>
        <Form
          onSubmit={handleSubmit}
          className="login-form"
          style={{ width: 400, margin: "auto" }}
        >
          <Form.Item>
            <Input
              name="email"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item hasFeedback>
            <Input.Password
              name="password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <a className="login-form-forgot" href="#_">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Register
            </Button>
            Or <a href="##">login now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export const RegisterView = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);
