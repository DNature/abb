import React from "react";
import { validUserSchema } from "@abb/common";
import { Form as AntForm, Icon, Button } from "antd";
import { withFormik, FormikErrors, FormikProps, Field, Form } from "formik";
import { InputField } from "../../shared/InputField";

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
          />

          <AntForm.Item>
            <a className="login-form-forgot" href="#_">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              disabled={!values.email || !values.password}
              loading={!values.email || !values.password}
            >
              Register
            </Button>
            Or <a href="##">login now!</a>
          </AntForm.Item>
        </div>
      </Form>
    );
  }
}

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema: validUserSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);
