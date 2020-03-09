import * as React from "react";
import { graphql, ChildProps } from "react-apollo";
import { RouteProps, Route, RouteComponentProps, Redirect } from "react-router";
import gql from "graphql-tag";
import { MeQyery } from "../../__generated__/MeQyery";

type Props = RouteProps;

export class C extends React.PureComponent<ChildProps<Props, MeQyery>> {
  renderRoute = (routeProps: RouteComponentProps) => {
    const { data, component } = this.props;
    if (!data || data.loading) {
      return null;
    }

    if (!data.me || !data.me.email) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { next: routeProps.location.pathname }
          }}
        />
      );
    }

    const Component = component as any;

    return <Component {...routeProps} />;
  };

  render() {
    const { data: _, component: __, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

const meQuery = gql`
  query MeQyery {
    me {
      email
    }
  }
`;

export const AuthRoute = graphql<Props, MeQyery>(meQuery)(C as any);
