import * as React from "react";
import { Field } from "formik";

import { InputField } from "../../../shared/InputField";

export const Page3 = () => (
  <>
    <Field label="Price" name="longitude" placeholder="Longitude" component={InputField} />
      <Field label="Price" name="latitude" placeholder="Latitude" component={InputField} />
    <Field name="amenities" placeholder="Amenities" component={InputField} />
  </>
);
