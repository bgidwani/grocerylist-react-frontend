import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import GroceryListService from '../grocerylist.service';
import { useGroceryListContext } from '../context/grocerylist-provider';

const useStyles = makeStyles((theme) => ({
    card: { maxWidth: 300 },
    avatar: {
        backgroundColor: red[500],
    },
    media: {
        marginLeft: 50,
        height: 200,
        width: 200,
    },
    chip: { margin: theme.spacing(0.5) },
}));

export default function GroceryItemCard({ listid, name, items }) {
    const classes = useStyles();
    const { refreshList, setToast } = useGroceryListContext();

    const handleDelete = () => {
        var result = window.confirm('Sure you want to delete the list?');
        if (result) {
            //delete the list
            GroceryListService.remove(listid).then((data) => {
                if (data === true) {
                    setToast('List deleted');
                    refreshList();
                } else {
                    setToast(data);
                }
            });
        }
    };

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        {name.slice(0, 1)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon color="inherit" />
                    </IconButton>
                }
                title={
                    <Typography
                        gutterBottom
                        align="center"
                        variant="h5"
                        component="h2"
                    >
                        {name}
                    </Typography>
                }
            />
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/assets/cart-checked.png"
                />
                <CardContent>
                    <Typography
                        align="center"
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
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
