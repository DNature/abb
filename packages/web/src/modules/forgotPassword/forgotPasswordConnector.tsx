import * as React from 'react';
import { ForgotPasswordView } from './ui/forgotPasswordView';
import {ForgotPasswordController} from '@abb/controller'

export class ForgotPasswordConnector extends React.PureComponent {
    render(){
        return (<ForgotPasswordController>
            {({submit}) => (<ForgotPasswordView submit={submit} />)}
            </ForgotPasswordController>)
    }
}