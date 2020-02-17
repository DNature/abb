import * as React from "react";
import { ForgotPasswordChangeMutationVariables } from "../../__generated__/ForgotPasswordChangeMutation";
import { NormalizedErrorMap } from "../../types/normalizedErrorMap";
interface Props {
    children: (data: {
        submit: (values: ForgotPasswordChangeMutationVariables) => Promise<NormalizedErrorMap | null>;
    }) => JSX.Element | null;
}
export declare const ChangePasswordController: React.ComponentClass<Props, any>;
export {};
