import React, { Component } from "react";
import { LoginController } from "@abb/controller";

import { LoginView } from "./ui/LoginView";

export class LoginConnector extends Component {
  render() {
    return (
      <LoginController>
        {({ submit }) => <LoginView submit={submit} />}
      </LoginController>
    );
  }
}
