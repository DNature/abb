import * as React from "react";
import { ChildProps } from "react-apollo";
import { RouteProps, RouteComponentProps } from "react-router";
import { MeQyery } from "../../__generated__/MeQyery";
declare type Props = RouteProps;
export declare class C extends React.PureComponent<ChildProps<Props, MeQyery>> {
    renderRoute: (routeProps: RouteComponentProps<{}, import("react-router").StaticContext, import("history").History.PoorMansUnknown>) => JSX.Element | null;
    render(): JSX.Element;
}
export declare const AuthRoute: React.ComponentClass<RouteProps, any>;
export {};
