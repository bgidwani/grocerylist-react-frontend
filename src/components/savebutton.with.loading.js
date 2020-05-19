import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, red } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import SaveIcon from '@material-ui/icons/Save';
import * as utils from '../utils';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonError: {
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
}));

const SaveButtonWithLoading = React.forwardRef((props, ref) => {
    const classes = useStyles();
    const onClickHandler = props.onClickHandler;
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
        [classes.buttonError]: error,
    });

    const click = () => handleButtonClick();
    React.useImperativeHandle(ref, () => ({
        click,
    }));

    const handleButtonClick = async () => {
        if (!loading) {
            setSuccess(false);
            setError(false);
            setLoading(true);
            const result = await onClickHandler();

            await utils.delay(500);

            //console.log('Inside setTimeout', result);
            if (result === false) {
                setError(true);
            } else {
                setSuccess(true);
            }
            setLoading(false);

            return true;
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Fab
                    aria-label="save"
                    color="primary"
                    className={buttonClassname}
                    onClick={handleButtonClick}
                >
                    {error ? (
                        <ErrorIcon />
                    ) : success ? (
                        <CheckIcon />
                    ) : (
                        <SaveIcon />
                    )}
                </Fab>
                {loading && (
                    <CircularProgress
                        size={68}
                        className={classes.fabProgress}
                    />
                )}
            </div>
        </div>
    );
});

export default SaveButtonWithLoading;
