import React from "react";
import { Form as AntForm, Icon, Button } from "antd";
import { withFormik, FormikProps, Field, Form } from "formik";
import { InputField } from "../../shared/InputField";
import { NormalizedErrorMap } from '@abb/controller';

interface FormValues {
  email: string;
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

          <AntForm.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              disabled={!values.email}
            >
             Reset password
            </Button>
          </AntForm.Item>
        </div>
      </Form>
    );
  }
}

export const ForgotPasswordView = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({ email: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish()
    }
  }
})(C);
