import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import AuthService from './auth/auth.service';

import Login from './login/login.component';
import GroceryList from './lists/grocerylist.component';

const styles = () => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
});

// ==================================
//   Define themes for the app
// ==================================
const defaultTheme = createMuiTheme();

const purpleTheme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: {
            main: '#f44336',
        },
    },
});

const fontTheme = createMuiTheme({
    palette: {
        secondary: purple,
        primary: green,
    },
    typography: {
        fontFamily: ['Courier', 'Helvetica'],
    },
});

const themes = [defaultTheme, purpleTheme, fontTheme];

// ==================================
//     End theme definitions
// ==================================

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            AuthService.isAuthenticated() === true ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            theme: themes[0],
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: AuthService.getCurrentUser(),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { classes } = this.props;
        const { currentUser } = this.state;
        return (
            <div className={classes.root}>
                <Router>
                    <MuiThemeProvider theme={this.state.theme}>
                        {currentUser ? (
                            <AppBar position="static">
                                <Toolbar>
                                    <TypoGraphy
                                        variant="h6"
                                        className={classes.title}
                                        color="inherit"
                                    >
                                        Lists
                                    </TypoGraphy>
                                    <Button
                                        color="inherit"
                                        href="/login"
                                        onClick={this.logOut}
                                    >
                                        LogOut
                                    </Button>
                                </Toolbar>
                            </AppBar>
                        ) : (
                            <div></div>
                        )}
                    </MuiThemeProvider>

                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute exact path="/" component={GroceryList} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default withStyles(styles)(App);
