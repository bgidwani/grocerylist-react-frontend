import React from 'react';
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

const LoginLayout = (props) => {
    const { classes, parentState } = props;

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
                    <form className={classes.form} onSubmit={props.handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            required
                            onBlur={props.onBlurEmail}
                            error={
                                parentState.error_email.length === 0
                                    ? false
                                    : true
                            }
                            helperText={parentState.error_email}
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
                            onBlur={props.onBlurPassword}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {parentState.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Sign In</span>
                        </Button>
                        {parentState.message && (
                            <Snackbar
                                open={parentState.toastOpen}
                                autoHideDuration={2000}
                                onClose={props.toggleToastClose}
                            >
                                <MuiAlert
                                    elevation={6}
                                    variant="filled"
                                    severity="error"
                                >
                                    {parentState.message}
                                </MuiAlert>
                            </Snackbar>
                        )}
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default LoginLayout;
