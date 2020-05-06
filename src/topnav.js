import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import TypoGraphy from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useAuthDataContext } from './auth-provider';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
    },
}));

const TopNav = () => {
    const { user, onLogout } = useAuthDataContext();
    const styles = useStyles();

    return user ? (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <img
                        src="/assets/main_image.jpg"
                        alt="main"
                        height="50"
                        width="50"
                    />
                </IconButton>
                <TypoGraphy
                    variant="h6"
                    className={styles.title}
                    color="inherit"
                >
                    Lists
                </TypoGraphy>
                <Button color="inherit" onClick={onLogout}>
                    LogOut
                </Button>
            </Toolbar>
        </AppBar>
    ) : (
        <div></div>
    );
};

export default TopNav;
