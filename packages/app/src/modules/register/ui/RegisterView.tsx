import React from "react";
import { validUserSchema } from "@abb/common";
import { withFormik, FormikErrors, FormikProps, Field } from "formik";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-elements";

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
    const { handleSubmit } = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingLeft: 20,
          paddingRight: 20
        }}
      >
        <Card>
          <Text style={{ fontSize: 25, marginBottom: 10 }}>Register</Text>
          <Field name="email" placeholder="Email" component={InputField} />

          <Field
            name="password"
            placeholder="Password"
            component={InputField}
            secureTextEntry={true}
          />

          <View style={{ marginTop: 15 }}>
            <Button onPress={handleSubmit as any} title="SIGN UP" />
          </View>
        </Card>
      </View>
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
