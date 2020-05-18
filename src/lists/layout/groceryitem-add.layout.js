import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import GroceryListService from '../grocerylist.service';
import { useAuthDataContext } from '../../auth-provider';
import { useGroceryListContext } from '../context/grocerylist-provider';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        maxWidth: 300,
    },
    media: {
        marginLeft: 50,
        marginTop: 40,
        height: 200,
        width: 200,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    fabbutton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
}));

export default function GroceryItemAddCard() {
    const { user } = useAuthDataContext();
    const { refreshList, setToast } = useGroceryListContext();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            createNewList();
        }
    };

    const handleSave = (e) => {
        e.preventDefault();

        createNewList();
    };

    const createNewList = () => {
        if (name && name !== '') {
            GroceryListService.create(name).then(() => {
                //refresh the data on the list page
                refreshList();

                //close the modal pop-up
                setOpen(false);

                //display toast message on parent
                setToast(`List ${name} added successfully`);
            });
        }
    };

    return !user ? (
        <div></div>
    ) : (
        <div>
            <Fab
                className={classes.fabbutton}
                color="primary"
                aria-label="add"
                onClick={handleOpen}
            >
                <AddIcon />
            </Fab>
            <Modal className={classes.modal} open={open} onClose={handleClose}>
                <div className={classes.paper}>
                    <Box>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                            name="newitem"
                            label="List Name"
                            id="newitem"
                            error={name.length === 0 ? true : false}
                            helperText={
                                name.length === 0 ? 'List name is required' : ''
                            }
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </Box>
                </div>
            </Modal>
        </div>
    );
}
