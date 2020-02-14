import React, { Component } from "react";
import { RegisterController } from "@abb/controller";
import { RegisterView } from "./ui/RegisterView";

export class RegisterConnector extends Component {
  render() {
    return (
      <>
        <RegisterController>
          {({ submit }) => <RegisterView submit={submit} />}
        </RegisterController>
      </>
    );
  }
}
