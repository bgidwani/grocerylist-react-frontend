import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Fab, TextField, Fade } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import GroceryListService from '../../grocerylist.service';
import { useAuthDataContext } from '../../../auth-provider';
import { useGroceryListContext } from '../../context/grocerylist-provider';
import RewardsButton from '../../../components/rewards.button';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 350,
        height: 90,
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

export default function AddList() {
    const { user } = useAuthDataContext();
    const { refreshList, setToast } = useGroceryListContext();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [dirty, setDirty] = React.useState(false);
    const [saving, setSaving] = React.useState(false);
    const saveButtonRef = React.useRef(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setDirty(true);
        let currVal = e.target.value;
        if (currVal && currVal.trim() !== '') {
            setName(currVal.trim());
        }
    };

    const handleKeyDown = (e) => {
        //e.preventDefault();
        if (e.key === 'Enter') {
            // console.log(saveButtonRef);
            if (saveButtonRef) {
                saveButtonRef.current.click();
            }
        }
    };

    const createNewList = async () => {
        if (name && name !== '') {
            setSaving(true);
            await GroceryListService.create(name).then(() => {
                setTimeout(() => {
                    //refresh the data on the list page
                    refreshList();

                    //close the modal pop-up
                    setOpen(false);

                    //display toast message on parent
                    setToast(`List ${name} added successfully`);

                    setSaving(false);
                }, 1500);
            });
            return true;
        } else {
            setName('');
            return false;
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
                <Fade in={open}>
                    <div className={classes.paper}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            style={{ width: '80%' }}
                            required
                            autoFocus
                            disabled={saving}
                            name="newitem"
                            label="Name of the new list"
                            id="newitem"
                            error={dirty && name.length === 0 ? true : false}
                            helperText={
                                dirty && name.length === 0
                                    ? 'List name is required'
                                    : ''
                            }
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />

                        <RewardsButton
                            ref={saveButtonRef}
                            type="save"
                            top="-70px"
                            onClickHandler={createNewList}
                        />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
