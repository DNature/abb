import * as React from "react";
import { FieldProps } from "formik";
import { Form, Select } from "antd";

export const TagField: React.SFC<FieldProps<any> & {
  prefix: React.ReactNode;
  label?: string;
}> = ({
  field: { onChange, onBlur: _, ...field }, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  children,
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  return (
    <Form.Item
      label={label}
      help={touched[field.name] && errors[field.name] ? errors[field.name] : ""}
      validateStatus={
        errorMsg ? "error" : !touched[field.name] ? "" : "success"
      }
      hasFeedback
    >
      <Select
        {...field}
        {...props}
        mode="tags"
        style={{ width: "100%" }}
        onChange={(newValue: string[]) => setFieldValue(field.name, newValue)}
      >
        {children}
      </Select>
    </Form.Item>
  );
};
