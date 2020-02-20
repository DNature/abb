import * as React from "react";
import { Field } from "formik";

import { InputField } from "../../../shared/InputField";

export const Page2 = () => (
  <>
    <Field
      label="Price"
      name="price"
      placeholder="Price"
      component={InputField}
      useNumberComponent={true}
    />
    <Field
      useNumberComponent={true}
      label="Beds"
      name="beds"
      placeholder="Beds"
      component={InputField}
    />
    <Field
      label="Guests"
      name="guests"
      placeholder="Guests"
      useNumberComponent={true}
      component={InputField}
    />
  </>
);
