import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import purple from '@material-ui/colors/purple';
// import green from '@material-ui/colors/green';

import AuthService from './auth/auth.service';

import Login from './login/login.component';
import Users from './users/users.component';

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

/*const purpleTheme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  }
});

const fontTheme = createMuiTheme({
  palette: {
    secondary: purple,
    primary: green
  },
  typography: {
    fontFamily: ['Courier', 'Helvetica'],
  }
})

const themes = [defaultTheme, purpleTheme, fontTheme]
*/

// ==================================
//     End theme definitions
// ==================================

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      AuthService.isAuthenticated() === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

class App extends Component {
    constructor(props) {
        super(props);
        //this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            theme: defaultTheme,
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

    render() {
        const { classes } = this.props;
        const { currentUser } = this.state;
        return (
            <Router>
                <div className={classes.root}>
                    <MuiThemeProvider theme={this.state.theme}>
                        {currentUser ? (
                            <AppBar position="static">
                                <Toolbar>
                                    <TypoGraphy
                                        variant="h6"
                                        className={classes.title}
                                        color="inherit"
                                    >
                                        Groceries
                                    </TypoGraphy>
                                    <div className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Button color="inherit">
                                                {currentUser.username}
                                            </Button>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/login"
                                                className="nav-link"
                                                onClick={this.logOut}
                                            >
                                                LogOut
                                            </a>
                                        </li>
                                    </div>
                                </Toolbar>
                            </AppBar>
                        ) : (
                            <div></div>
                        )}
                    </MuiThemeProvider>
                </div>

                <Switch>
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/" component={Users} />
                </Switch>
            </Router>
        );
    }
}

export default withStyles(styles)(App);
