import * as React from "react";
import { RegisterController } from "@abb/controller";
import {RouteComponentProps} from 'react-router-dom'
import { RegisterView } from "./ui/RegisterView";

export class RegisterConnector extends React.PureComponent<RouteComponentProps<{}>> {
  onFinish = () => {
    this.props.history.push("/m/confirm-email", {message: "check your email to confirm your account"})
  }
  
  render() {
    return (
      <>
        <RegisterController>
          {({ submit }) => <RegisterView onFinish={this.onFinish} submit={submit} />}
        </RegisterController>
      </>
    );
  }
}
