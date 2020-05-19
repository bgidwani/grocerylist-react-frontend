import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    MenuItem,
    ListItemText,
    Button,
    makeStyles,
    fade,
    Avatar,
} from '@material-ui/core';

import { NavLink } from 'react-router-dom';

import { useTopNavDataContext } from '../topnav/topnav.provider';
import { useAuthDataContext } from '../auth-provider';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    headingmenu: {
        color: theme.palette.common.white,
        textDecoration: 'none',
        textTransform: 'uppercase',
        '& > a': {
            color: theme.palette.common.white,
            textDecoration: 'none',
        },
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    largelogo: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginRight: theme.spacing(1),
    },
}));

const TopNav = () => {
    const { user, onLogout } = useAuthDataContext();
    const { title } = useTopNavDataContext();
    const classes = useStyles();

    return user ? (
        <AppBar position="sticky">
            <Toolbar>
                <NavLink to="/">
                    <Avatar
                        alt="logo"
                        src="/assets/main_image.jpg"
                        className={classes.largelogo}
                    />
                </NavLink>
                <Typography
                    variant="h6"
                    className={classes.title}
                    color="inherit"
                >
                    {title}
                </Typography>
                <div className={classes.grow} />
                <div className={classes.headingmenu}>
                    <NavLink to="/">
                        <MenuItem>
                            <ListItemText primary="Home" />
                        </MenuItem>
                    </NavLink>
                </div>
                <div className={classes.headingmenu}>
                    <NavLink exact to="/recipes">
                        <MenuItem>
                            <ListItemText primary="Recipes" />
                        </MenuItem>
                    </NavLink>
                </div>
                <div>
                    <Button color="inherit" onClick={onLogout}>
                        LogOut
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    ) : (
        <div></div>
    );
};

export default TopNav;
