import React from 'react';
import { makeStyles } from '@material-ui/core';
import groceryListStyles from './grocerylist.styles';
import GroceryListLayout from './layout/main.layout';
import GroceryListProvider from './context/grocerylist-provider';

const useStyles = makeStyles(groceryListStyles);

const GroceryList = () => {
    const classes = useStyles();

    return (
        <GroceryListProvider>
            <GroceryListLayout classes={classes} />
        </GroceryListProvider>
    );
};

export default GroceryList;
