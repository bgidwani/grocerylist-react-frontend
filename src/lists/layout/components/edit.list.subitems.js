import React from 'react';
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

    const ListService = GroceryListService.list(listid);

    const eventHandlers = {
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

            console.log('Invoking parent callback');

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
        <MaterialTable
            columns={listEditTable.columns}
            title=""
            data={subItems}
            options={listEditTable.options}
            onRowClick={eventHandlers.handleItemClick}
            editable={{
                isEditable: (rowData) => rowData.bought === false,
                isDeletable: (rowData) => rowData.bought === false,
                onRowAdd: eventHandlers.handleItemAdd,
                onRowUpdate: eventHandlers.handleItemUpdate,
                onRowDelete: eventHandlers.handleItemDelete,
            }}
        />
    );
};

export default EditListSubItems;
