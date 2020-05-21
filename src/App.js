import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { withStyles } from '@material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple, green } from '@material-ui/core/colors';
import ReactGA from 'react-ga';

import AuthDataProvider from './auth-provider';
import Router from './router';
import TopNav from './topnav/topnav.component';
import TopNavDataProvider from './topnav/topnav.provider';

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

    componentDidMount() {
        ReactGA.initialize('UA-165265113-2');
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <BrowserRouter>
                    <MuiThemeProvider theme={this.state.theme}>
                        <AuthDataProvider>
                            <TopNavDataProvider>
                                <TopNav />
                                <Router />
                            </TopNavDataProvider>
                        </AuthDataProvider>
                    </MuiThemeProvider>
                </BrowserRouter>
            </div>
        );
    }
}

export default withStyles(styles)(App);
