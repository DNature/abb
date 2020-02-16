import * as React from "react";
import { RegisterMutationVariables } from "../../__generated__/RegisterMutation";
import { NormalizedErrorMap } from "../../types/normalizedErrorMap";
interface Props {
    children: (data: {
        submit: (values: RegisterMutationVariables) => Promise<NormalizedErrorMap | null>;
    }) => JSX.Element | null;
}
export declare const RegisterController: React.ComponentClass<Props, any>;
export {};
