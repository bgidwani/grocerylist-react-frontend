import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { withStyles } from '@material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import AuthDataProvider from './auth-provider';
import Router from './router';
import TopNav from './topnav';

const styles = () => ({
    root: {
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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theme: themes[0],
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <BrowserRouter>
                    <MuiThemeProvider theme={this.state.theme}>
                        <AuthDataProvider>
                            <TopNav />
                            <Router />
                        </AuthDataProvider>
                    </MuiThemeProvider>
                </BrowserRouter>
            </div>
        );
    }
}

export default withStyles(styles)(App);
