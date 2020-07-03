import * as React from "react";
import { FieldProps } from "formik";
import { useDropzone } from "react-dropzone";

export const DropzoneField: React.SFC<FieldProps<any>> = ({
  field: { name }, // { name, value, onChange, onBlur }
  form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const onDrop = React.useCallback(
    ([file]: any) => {
      setFieldValue(name, file);
    },
    [name, setFieldValue]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      {...props}
      style={{ width: 150, height: 150, border: "1px solid doted" }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};
