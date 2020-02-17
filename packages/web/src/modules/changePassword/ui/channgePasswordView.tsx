import React from "react";
import { Form as AntForm, Icon, Button } from "antd";
import { withFormik, FormikProps, Field, Form } from "formik";
import { InputField } from "../../shared/InputField";
import { NormalizedErrorMap } from '@abb/controller';
import { changePasswordSchema } from '@abb/common';
import { ForgotPasswordChangeMutationVariables } from '@abb/controller/dist/__generated__/ForgotPasswordChangeMutation';

interface FormValues {
  newPassword: string;
}

interface Props {
  onFinish: () => void
  token: string;
  submit: (
    values: ForgotPasswordChangeMutationVariables
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
              name="newPassword"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="New Password"
            component={InputField}
            type="password"
          />

          <AntForm.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              disabled={!values.newPassword}
            >
             change password
            </Button>
          </AntForm.Item>
        </div>
      </Form>
    );
  }
}

export const ChangePasswordView = withFormik<Props, FormValues>({
  validationSchema: changePasswordSchema,
  mapPropsToValues: () => ({ newPassword: "" }),
  handleSubmit: async ({newPassword}, { props, setErrors }) => {
    const errors = await props.submit({newPassword, key: props.token});
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish()
    }
  }
})(C);
