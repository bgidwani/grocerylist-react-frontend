import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    chip: {
        margin: theme.spacing(0.5),
    },
    chip_done: {
        margin: theme.spacing(0.5),
        textDecorationLine: 'line-through',
    },
}));

const DisplayListSubItems = ({ subItems, limititems }) => {
    const classes = useStyles();
    const items = limititems ? subItems.slice(0, 5) : subItems;

    return (
        <Typography
            align="center"
            variant="body2"
            color="textSecondary"
            component="div"
        >
            {items.map((item) => {
                return (
                    <Chip
                        key={item._id}
                        className={
                            item.bought ? classes.chip_done : classes.chip
                        }
                        label={item.name}
                        size="medium"
                        color="primary"
                    />
                );
            })}
        </Typography>
    );
};

export default DisplayListSubItems;
