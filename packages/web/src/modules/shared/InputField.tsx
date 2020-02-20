import * as React from "react";
import { FieldProps } from "formik";
import { Form, Input, InputNumber } from "antd";

interface Props {
  prefix: React.ReactNode;
  label?: string;
  useNumberComponent?: boolean;
  isPassword: boolean;
  component: React.ReactType;
}

export const InputField: React.FunctionComponent<FieldProps<any> & Props> = ({
  field: { onChange, ...field }, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  useNumberComponent = false,
  isPassword = false,
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  // const Comp = () =>
  //   useNumberComponent ? (
  //     <InputNumber
  //       {...field}
  //       {...props}
  //       onChange={
  //         useNumberComponent
  //           ? (newValue: any) => setFieldValue(field.name, newValue)
  //           : onChange
  //       }
  //     />
  //   ) : isPassword ? (
  //     <Input.Password
  //       {...field}
  //       {...props}
  //       prefix={prefix}
  //       onChange={
  //         useNumberComponent
  //           ? (newValue: any) => setFieldValue(field.name, newValue)
  //           : onChange
  //       }
  //     />
  //   ) : (
  //     <Input
  //       {...field}
  //       {...props}
  //       prefix={prefix}
  //       onChange={
  //         useNumberComponent
  //           ? (newValue: any) => setFieldValue(field.name, newValue)
  //           : onChange
  //       }
  //     />
  //   );

  const Comp: any = useNumberComponent ? InputNumber : Input;

  return (
    <Form.Item
      label={label}
      help={touched[field.name] && errors[field.name] ? errors[field.name] : ""}
      validateStatus={
        errorMsg ? "error" : !touched[field.name] ? "" : "success"
      }
      hasFeedback
    >
      <Comp
        {...field}
        {...props}
        onChange={
          useNumberComponent
            ? (newValue: any) => setFieldValue(field.name, newValue)
            : onChange
        }
      />{" "}
    </Form.Item>
  );
};
