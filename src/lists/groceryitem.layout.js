import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';

const useStyles = makeStyles((theme) => ({
    card: { maxWidth: 300 },
    media: {
        marginLeft: 50,
        height: 200,
        width: 200,
    },
    //media: { height: 140 },
    chip: { margin: theme.spacing(0.5) },
}));

export default function GroceryItemCard({ name, items }) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/assets/cart-checked.png"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <div className={classes.root}>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="div"
                        >
                            {items.slice(0, 5).map((item) => {
                                return (
                                    <Chip
                                        className={classes.chip}
                                        label={item.name}
                                        color="primary"
                                    />
                                );
                            })}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
