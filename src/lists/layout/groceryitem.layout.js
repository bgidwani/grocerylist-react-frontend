import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import { Animator } from 'lottie-react';
import listData from '../../assets/lottie/list.json';
import noSubitemsInList from '../../assets/lottie/noSubitemsInList.json';

const useStyles = makeStyles(() => ({
    card: {
        width: 300,
    },
    avatar: {
        backgroundColor: red[500],
    },
    media: {
        height: 240,
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
    const imgDisplayData = subItems.length > 0 ? listData : noSubitemsInList;

    const handleListDelete = () => {
        setAnchorEl(null);
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

    const handleListEdit = () => {
        setAnchorEl(null);
        setEditMode(true);
    };

    const handleItemEditClose = () => {
        refreshList();
        setEditMode(false);
    };

    //state used for displaying menu for individual list
    const [anchorEl, setAnchorEl] = React.useState(null);

    const displayListMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                            <IconButton
                                aria-label="settings"
                                onClick={displayListMenu}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="list-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <Typography display="block">
                                    <IconButton
                                        size="small"
                                        onClick={handleListEdit}
                                    >
                                        <Edit
                                            fontSize="small"
                                            color="primary"
                                        />
                                        <Typography
                                            style={{ paddingLeft: '5px' }}
                                            color="textPrimary"
                                            variant="subtitle1"
                                        >
                                            Edit
                                        </Typography>
                                    </IconButton>
                                </Typography>
                                <Typography display="block">
                                    <IconButton
                                        size="small"
                                        onClick={handleListDelete}
                                    >
                                        <DeleteIcon
                                            fontSize="small"
                                            color="secondary"
                                        />
                                        <Typography
                                            style={{ paddingLeft: '5px' }}
                                            color="textSecondary"
                                            variant="subtitle1"
                                        >
                                            Delete
                                        </Typography>
                                    </IconButton>
                                </Typography>
                            </Menu>
                        </div>
                    }
                    title={<Typography variant="h6">{name}</Typography>}
                />
                <CardMedia className={classes.media}>
                    <Animator animationData={imgDisplayData} />
                </CardMedia>

                <CardContent>
                    <DisplayListSubItems
                        subItems={subItems}
                        limititems={true}
                    />
                </CardContent>
            </Card>
            <Dialog
                open={isEditMode}
                onClose={handleItemEditClose}
                TransitionComponent={Transition}
            >
                <DialogTitle id="edit-list-subitems">{name}</DialogTitle>
                <DialogContent>
                    <EditListSubItems
                        listId={listid}
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
