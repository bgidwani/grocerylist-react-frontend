import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import AuthService from '../auth/auth.service';
import loginStyles from './login.styles';
import LoginLayout from './login.layout';
import * as utils from '../utils';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onBlurEmail = this.onBlurEmail.bind(this);
        this.onBlurPassword = this.onBlurPassword.bind(this);
        this.toggleToastClose = this.toggleToastClose.bind(this);
        this.navigateToHome = this.navigateToHome.bind(this);

        this.state = {
            email: '',
            password: '',
            loading: false,
            message: '',
            error_email: '',
            toastOpen: false,
        };
    }

    onBlurEmail(e) {
        var input = e.target.value;
        if (!input || !utils.validations.isEmailValid(input)) {
            this.setState({
                email: '',
                error_email: 'Enter valid email',
            });
            return false;
        } else {
            this.setState({
                email: input,
                error_email: '',
            });
        }
    }

    onBlurPassword(e) {
        var input = e.target.value;
        if (!input || input !== '') {
            this.setState({
                password: e.target.value,
            });
        }
    }

    toggleToastClose() {
        this.setState({
            toastOpen: false,
        });
    }

    navigateToHome() {
        if (AuthService.getCurrentUser()) {
            this.props.history.push('/');
            window.location.reload();
        } else {
            console.log('No user found');
        }
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: '',
            loading: true,
        });

        if (this.state.error_email.length === 0) {
            AuthService.login(this.state.email, this.state.password).then(
                () => {
                    this.navigateToHome();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.error) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage,
                        toastOpen: true,
                    });
                }
            );
        } else {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        this.navigateToHome();

        return (
            <LoginLayout
                classes={this.props.classes}
                parentState={this.state}
                handleLogin={this.handleLogin}
                onBlurEmail={this.onBlurEmail}
                onBlurPassword={this.onBlurPassword}
                toggleToastClose={this.toggleToastClose}
            />
        );
    }
}

export default withStyles(loginStyles)(Login);
