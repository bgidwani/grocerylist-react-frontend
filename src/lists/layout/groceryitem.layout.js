import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
import { CardActions, TextField } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    chip: {
        margin: theme.spacing(0.5),
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    textField: {
        marginBottom: 20,
    },
    chip_done: {
        margin: theme.spacing(0.5),
        textDecorationLine: 'line-through',
    },
}));

export default function GroceryItemCard({ listid, name, items }) {
    const classes = useStyles();
    const { refreshList, setToast } = useGroceryListContext();
    const [expanded, setExpanded] = React.useState(false);
    const [data, setData] = React.useState(items);

    const handleListDelete = () => {
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

    const handleItemDelete = (item) => {
        var result = window.confirm(
            `Are you sure you want to remove ${item.name}?`
        );
        if (result) {
            const newData = data.filter((srcitem) => srcitem._id !== item._id);
            setData(newData);
        }
    };

    const handleItemClick = (item) => {
        // window.alert(`Clicked ${item.name}`);
        const updatedData = data.map((el) =>
            el._id === item._id ? Object.assign({}, el, { isdone: true }) : el
        );
        setData(updatedData);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            const enteredText = e.target.value;
            //add the item to the collection
            // https://medium.com/javascript-in-plain-english/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc
            setData((data) => [...data, { name: enteredText }]);

            //clear the entered text
            e.target.value = '';
            e.preventDefault();
        }
    };

    const renderItems = (limititems) => {
        const items = limititems ? data.slice(0, 5) : data;

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
                            className={
                                item.isdone ? classes.chip_done : classes.chip
                            }
                            label={item.name}
                            size="medium"
                            color="primary"
                            onClick={
                                expanded ? () => handleItemClick(item) : null
                            }
                            onDelete={
                                expanded ? () => handleItemDelete(item) : null
                            }
                        />
                    );
                })}
            </Typography>
        );
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
                    <IconButton aria-label="delete" onClick={handleListDelete}>
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
                {!expanded && <CardContent> {renderItems(true)} </CardContent>}
                <CardActions>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography
                            component="div"
                            className={classes.textField}
                        >
                            <TextField
                                name="search"
                                placeholder="type to add item"
                                id="search"
                                variant="outlined"
                                size="small"
                                onKeyDown={handleSearchKeyPress}
                            />
                        </Typography>
                        <Typography component="div">
                            {renderItems(false)}
                        </Typography>
                    </CardContent>
                </Collapse>
            </CardActionArea>
        </Card>
    );
}
