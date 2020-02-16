import * as React from "react";
import { SendForgotPasswordEmailMutationVariables } from "../../__generated__/SendForgotPasswordEmailMutation";
interface Props {
    children: (data: {
        submit: (values: SendForgotPasswordEmailMutationVariables) => Promise<null>;
    }) => JSX.Element | null;
}
export declare const ForgotPasswordController: React.ComponentClass<Props, any>;
export {};
