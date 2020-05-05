import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    card: {
        maxWidth: 300,
    },
    media: {
        marginLeft: 50,
        marginTop: 40,
        height: 200,
        width: 200,
    },
}));

export default function GroceryItemAddCard() {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/assets/item-add.png"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
