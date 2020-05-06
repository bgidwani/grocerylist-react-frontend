import React, { useState } from 'react';
import loginStyles from './login.styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';
import * as utils from '../utils';
import { useAuthDataContext } from '../auth-provider';
import AuthService from '../auth/auth.service';

const useStyles = makeStyles(loginStyles);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toastOpen, setToastOpen] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [toastMessage, setToast] = useState('');
    const { onLogin } = useAuthDataContext();
    const classes = useStyles();

    const onBlurEmail = (e) => {
        var input = e.target.value;
        if (!input || !utils.validations.isEmailValid(input)) {
            setEmail('');
            setEmailError('Enter valid email');
            return false;
        } else {
            setEmail(input);
            setEmailError('');
        }
    };

    const onBlurPassword = (e) => {
        var input = e.target.value;
        if (!input || input !== '') {
            setPassword(input);
        }
    };

    const toggleToastClose = () => {
        setToastOpen(false);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (emailError.length !== 0) {
            return;
        }

        AuthService.login(email, password).then(
            (user) => {
                onLogin(user);
                //navigateToHome();
            },
            (error) => {
                console.log('Login - Inside error', error);
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.error) ||
                    error.message ||
                    error.toString();

                setToast(resMessage);
                setToastOpen(true);
            }
        );
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            required
                            onBlur={onBlurEmail}
                            error={emailError.length === 0 ? false : true}
                            helperText={emailError}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onBlur={onBlurPassword}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            <span>Sign In</span>
                        </Button>
                        {toastMessage && (
                            <Snackbar
                                open={toastOpen}
                                autoHideDuration={2000}
                                onClose={toggleToastClose}
                            >
                                <MuiAlert
                                    elevation={6}
                                    variant="filled"
                                    severity="error"
                                >
                                    {toastMessage}
                                </MuiAlert>
                            </Snackbar>
                        )}
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default Login;
