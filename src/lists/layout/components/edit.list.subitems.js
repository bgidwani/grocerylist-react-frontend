import React, { forwardRef, useState } from 'react';
import FlipMove from 'react-flip-move';
import { makeStyles, Icon, TextField, Container } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import GroceryListService from '../../grocerylist.service';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
    },
    item: {
        position: 'relative',
        listStyle: 'none',
        background: 'linear-gradient(45deg, #a1c4fd 0%, #c2e9fb 100%)',
        width: '300px',
        height: '50px',
        borderRadius: 5,
        lineHeight: '50px',
        paddingLeft: '10px',
        fontSize: '14.5px',
        margin: 5,
        textTransform: 'uppercase',
        letterSpacing: 2,
        '& > #itemqty': {
            textDecoration: (props) => {
                return props.itembought ? 'line-through' : 'none';
            },
            width: '12%',
        },
        '& > input': {
            position: 'relative',
            width: '12%',
            left: -40,
            [theme.breakpoints.up('md')]: {
                visibility: 'hidden',
            },
            [theme.breakpoints.down('sm')]: {
                visibility: (props) => {
                    return props.itembought ? 'hidden' : 'visible';
                },
            },
        },
        '& > button': {
            top: 12,
            marginRight: 10,
            float: 'right',
            position: 'relative',
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        '&:hover > input': {
            visibility: (props) => {
                return props.itembought ? 'hidden' : 'visible';
            },
        },
        '&:hover > button': {
            display: 'block',
        },
    },
    itemContent: {
        textDecoration: (props) => {
            return props.itembought ? 'line-through' : 'none';
        },
        float: 'left',
        width: '55%',
    },
    itemSpacer: {
        width: '2%',
        float: 'left',
    },
}));

const FunctionalItem = forwardRef((props, ref) => {
    const listsubitem = props.subitem;
    const classes = useStyles({ itembought: listsubitem.bought });
    const style = { zIndex: 100 - props.index };

    const handleChange = (e) => {
        const newItemQuantity = e.target.valueAsNumber;
        props.handleItemUpdate(listsubitem, newItemQuantity);
    };

    const handleClick = (e) => {
        e.preventDefault();
        props.handleItemBought(listsubitem);
    };

    return (
        <li
            ref={ref}
            key={listsubitem._id}
            id={listsubitem._id}
            className={classes.item}
            style={style}
        >
            <span className={classes.itemContent} onClick={handleClick}>
                {listsubitem.name}
            </span>
            <span className={classes.itemSpacer}>&nbsp;</span>
            <span id="itemqty">{listsubitem.quantity}</span>
            <input
                type="number"
                min="1"
                defaultValue={listsubitem.quantity}
                onChange={handleChange}
            />
            <button>
                <DeleteIcon
                    onClick={(e) => props.handleItemDelete(listsubitem)}
                    color="error"
                />
            </button>
        </li>
    );
});

const ListSubItems = ({
    items,
    handleItemUpdate,
    handleItemBought,
    handleItemDelete,
}) => {
    const classes = useStyles();
    const enterLeaveAnimation = 'accordionVertical';

    return (
        <FlipMove
            staggerDurationBy="30"
            duration={500}
            enterAnimation={enterLeaveAnimation}
            leaveAnimation={enterLeaveAnimation}
            typeName="ul"
            className={classes.root}
        >
            {items.map((item, i) => (
                <FunctionalItem
                    key={item._id}
                    index={i}
                    handleItemBought={handleItemBought}
                    handleItemUpdate={handleItemUpdate}
                    handleItemDelete={handleItemDelete}
                    subitem={item}
                />
            ))}
        </FlipMove>
    );
};

const emptyCallback = () => {};

const EditListSubItems = ({ listId, subItems, callbackSubItemChange }) => {
    const parentCallback = callbackSubItemChange || emptyCallback;
    const [addItem, setAddItem] = React.useState('');

    const ListService = GroceryListService.list(listId);

    const eventHandlers = {
        handleChange: (e) => {
            setAddItem(e.target.value);
        },
        handleKeyDown: async (e) => {
            if (e.key === 'Enter') {
                let itemName = addItem;
                let itemQty = 1;
                const res = await ListService.addsubitem(itemName, itemQty);
                let newItemId = res.data.data.itemId;

                parentCallback((prevState) => {
                    const data = [...prevState];
                    data.push({
                        _id: newItemId,
                        name: itemName,
                        quantity: itemQty,
                        bought: false,
                    });
                    return data;
                });
                //clear the item
                setAddItem('');
            }
        },
        handleItemBought: async (itemData) => {
            const updatedValue = !itemData.bought;

            await ListService.subitem(itemData._id).update(
                'bought',
                updatedValue
            );

            parentCallback((prevState) => {
                const data = [...prevState];
                data[data.indexOf(itemData)].bought = updatedValue;
                return data;
            });
        },
        handleItemUpdate: async (itemData, newQuantity) => {
            if (itemData && newQuantity) {
                await ListService.subitem(itemData._id).update(
                    'quantity',
                    newQuantity
                );

                // update local data
                parentCallback((prevState) => {
                    const data = [...prevState];
                    data[data.indexOf(itemData)].quantity = newQuantity;
                    return data;
                });
            }
        },
        handleItemDelete: async (itemData) => {
            await ListService.subitem(itemData._id).remove();
            parentCallback((prevState) => {
                const data = [...prevState];
                data.splice(data.indexOf(itemData), 1);
                return data;
            });
        },
    };

    return (
        <Container style={{ height: '500px', overflow: 'auto' }}>
            <TextField
                size="small"
                fullWidth
                placeholder="enter item to add"
                variant="outlined"
                value={addItem}
                style={{ marginLeft: '5px' }}
                autoFocus
                onKeyDown={eventHandlers.handleKeyDown}
                onChange={eventHandlers.handleChange}
            />
            <ListSubItems
                items={subItems}
                handleItemBought={eventHandlers.handleItemBought}
                handleItemUpdate={eventHandlers.handleItemUpdate}
                handleItemDelete={eventHandlers.handleItemDelete}
            />
        </Container>
    );
};

export default EditListSubItems;
