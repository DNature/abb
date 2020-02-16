import * as React from "react";
import { LoginMutationVariables } from "../../__generated__/LoginMutation";
import { NormalizedErrorMap } from "../../types/normalizedErrorMap";
interface Props {
    onSessionId?: (sessionId: string) => void;
    children: (data: {
        submit: (values: LoginMutationVariables) => Promise<NormalizedErrorMap | null>;
    }) => JSX.Element | null;
}
export declare const LoginController: React.ComponentClass<Props, any>;
export {};
