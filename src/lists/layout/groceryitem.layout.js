import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import GroceryListService from '../grocerylist.service';
import { useGroceryListContext } from '../context/grocerylist-provider';
import Edit from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import DisplayListSubItems from './components/display.list.subitems';
import EditListSubItems from './components/edit.list.subitems';

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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function GroceryItemCard({ listid, name, items }) {
    const classes = useStyles();
    const { refreshList, setToast } = useGroceryListContext();
    const [subItems, setSubItems] = React.useState(items);
    const [isEditMode, setEditMode] = React.useState(false);

    const handleListDelete = () => {
        var result = window.confirm('Sure you want to delete the list?');
        if (result) {
            //delete the list
            GroceryListService.list(listid)
                .remove()
                .then((data) => {
                    if (data === true) {
                        setToast('List deleted');
                        refreshList();
                    } else {
                        setToast(data);
                    }
                });
        }
    };

    const handleExpandClick = () => {
        setEditMode(true);
    };

    const handleItemEditClose = () => {
        refreshList();
        setEditMode(false);
    };

    return (
        <div>
            <Card key={listid} className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>
                            {name.slice(0, 1)}
                        </Avatar>
                    }
                    action={
                        <div>
                            <IconButton onClick={handleExpandClick}>
                                <Edit />
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                onClick={handleListDelete}
                            >
                                <DeleteIcon color="inherit" />
                            </IconButton>
                        </div>
                    }
                    title={
                        <Typography align="center" variant="h5">
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
                        <DisplayListSubItems
                            subItems={subItems}
                            limititems={true}
                        />
                    </CardContent>
                </CardActionArea>
            </Card>
            <Dialog
                open={isEditMode}
                onClose={handleItemEditClose}
                TransitionComponent={Transition}
                aria-labelledby="edit-list-subitems"
            >
                <DialogTitle id="edit-list-subitems">{name}</DialogTitle>
                <DialogContent>
                    <EditListSubItems
                        listid={listid}
                        subItems={subItems}
                        callbackSubItemChange={setSubItems}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleItemEditClose} color="primary">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
