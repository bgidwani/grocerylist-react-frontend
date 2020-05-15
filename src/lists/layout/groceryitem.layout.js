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
import Edit from '@material-ui/icons/Edit';
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

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
    listitemdone: {
        textDecorationLine: 'line-through',
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

    const ListService = GroceryListService.list(listid);

    const listEditTable = {
        columns: [
            { title: 'Item', field: 'name' },
            { title: 'Quantity', field: 'quantity', type: 'numeric' },
        ],
        options: {
            filtering: false,
            sorting: true,
            search: false,
            exportButton: false,
            grouping: false,
            actionsColumnIndex: -1,
            pagination: false,
            rowStyle: (rowData) => ({
                textDecorationLine:
                    rowData.bought === true ? 'line-through' : 'none',
            }),
        },
    };

    const handleListDelete = () => {
        var result = window.confirm('Sure you want to delete the list?');
        if (result) {
            //delete the list
            ListService.remove().then((data) => {
                if (data === true) {
                    setToast('List deleted');
                    refreshList();
                } else {
                    setToast(data);
                }
            });
        }
    };

    const handleItemDelete = async (oldData) => {
        await ListService.subitem(oldData._id).remove();
        setSubItems((prevState) => {
            const data = [...prevState];
            data.splice(data.indexOf(oldData), 1);
            return data;
        });
    };

    const handleItemClick = async (event, rowData) => {
        const updatedValue = !rowData.bought;

        await ListService.subitem(rowData._id).update('bought', updatedValue);

        setSubItems((prevState) => {
            const data = [...prevState];
            data[data.indexOf(rowData)].bought = updatedValue;
            return data;
        });
    };

    const handleItemAdd = async (newData) => {
        await ListService.addsubitem(newData.name, newData.quantity);

        setSubItems((prevState) => {
            const data = [...prevState];
            data.push({
                name: newData.name,
                quantity: newData.quantity,
                bought: false,
            });
            return data;
        });
    };

    const handleItemUpdate = async (newData, oldData) => {
        if (oldData) {
            await ListService.subitem(oldData._id).update('name', newData.name);

            await ListService.subitem(oldData._id).update(
                'quantity',
                newData.quantity
            );

            // update local data
            setSubItems((prevState) => {
                const data = [...prevState];
                data[data.indexOf(oldData)] = newData;
                return data;
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

    const renderItems = (limititems) => {
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
                    <CardContent>{renderItems(true)}</CardContent>
                </CardActionArea>
            </Card>
            <Dialog
                open={isEditMode}
                onClose={handleItemEditClose}
                TransitionComponent={Transition}
                aria-labelledby="edit-list-dialog"
            >
                <DialogTitle id="edit-list-dialog">{name}</DialogTitle>
                <DialogContent>
                    <MaterialTable
                        columns={listEditTable.columns}
                        title=""
                        data={subItems}
                        options={listEditTable.options}
                        onRowClick={handleItemClick}
                        editable={{
                            isEditable: (rowData) => rowData.bought === false,
                            isDeletable: (rowData) => rowData.bought === false,
                            onRowAdd: handleItemAdd,
                            onRowUpdate: handleItemUpdate,
                            onRowDelete: handleItemDelete,
                        }}
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
