import React, { useState } from 'react';
import { Container, TextField } from '@material-ui/core';
import MaterialTable from 'material-table';
import GroceryListService from '../../grocerylist.service';

let parentCallback = null;

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

const emptyCallback = () => {};

const EditListSubItems = ({ listid, subItems, callbackSubItemChange }) => {
    parentCallback = callbackSubItemChange || emptyCallback;
    const [addItem, setAddItem] = useState('');

    const ListService = GroceryListService.list(listid);

    const eventHandlers = {
        handleChange: (e) => {
            setAddItem(e.target.value);
        },
        handleKeyDown: async (e) => {
            if (e.key === 'Enter') {
                let itemName = addItem;
                let itemQty = 1;
                await ListService.addsubitem(itemName, itemQty);
                parentCallback((prevState) => {
                    const data = [...prevState];
                    data.push({
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
        handleItemClick: async (event, rowData) => {
            const updatedValue = !rowData.bought;

            await ListService.subitem(rowData._id).update(
                'bought',
                updatedValue
            );

            parentCallback((prevState) => {
                const data = [...prevState];
                data[data.indexOf(rowData)].bought = updatedValue;
                return data;
            });
        },
        handleItemAdd: async (newData) => {
            await ListService.addsubitem(newData.name, newData.quantity);
            parentCallback((prevState) => {
                const data = [...prevState];
                data.push({
                    name: newData.name,
                    quantity: newData.quantity,
                    bought: false,
                });
                return data;
            });
        },
        handleItemUpdate: async (newData, oldData) => {
            if (oldData) {
                await ListService.subitem(oldData._id).update(
                    'name',
                    newData.name
                );

                await ListService.subitem(oldData._id).update(
                    'quantity',
                    newData.quantity
                );

                // update local data
                parentCallback((prevState) => {
                    const data = [...prevState];
                    data[data.indexOf(oldData)] = newData;
                    return data;
                });
            }
        },
        handleItemDelete: async (oldData) => {
            await ListService.subitem(oldData._id).remove();
            parentCallback((prevState) => {
                const data = [...prevState];
                data.splice(data.indexOf(oldData), 1);
                return data;
            });
        },
    };

    return (
        <Container maxWidth="sm">
            <TextField
                id="addItem"
                size="small"
                fullWidth
                placeholder="enter item to add"
                variant="outlined"
                value={addItem}
                autoFocus
                onKeyDown={eventHandlers.handleKeyDown}
                onChange={eventHandlers.handleChange}
            />
            <MaterialTable
                columns={listEditTable.columns}
                title=""
                data={subItems}
                options={listEditTable.options}
                onRowClick={eventHandlers.handleItemClick}
                editable={{
                    isEditable: (rowData) => rowData.bought === false,
                    isDeletable: (rowData) => rowData.bought === false,
                    onRowUpdate: eventHandlers.handleItemUpdate,
                    onRowDelete: eventHandlers.handleItemDelete,
                }}
            />
        </Container>
    );
};

export default EditListSubItems;
