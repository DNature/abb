import * as React from "react";
import { Field } from "formik";

import { InputField } from "../../../shared/InputField";
import { TagField } from "../../../shared/TagField";

export const Page3 = () => (
  <>
    <Field
      label="Longitude"
      name="longitude"
      placeholder="Longitude"
      component={InputField}
      useNumberComponent={true}
    />
    <Field
      label="Latitude"
      name="latitude"
      placeholder="Latitude"
      useNumberComponent={true}
      component={InputField}
    />
    <Field name="amenities" placeholder="Amenities" component={TagField} />
  </>
);
