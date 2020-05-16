import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import groceryListStyles from './grocerylist.styles';
import GroceryListLayout from './layout/main.layout';
import GroceryListProvider from './context/grocerylist-provider';
import { useTopNavDataContext } from '../topnav/topnav.provider';

const useStyles = makeStyles(groceryListStyles);

const GroceryList = () => {
    const classes = useStyles();

    const { setTitle } = useTopNavDataContext();

    useEffect(() => setTitle('Grocery List'), []);

    return (
        <GroceryListProvider>
            <GroceryListLayout classes={classes} />
        </GroceryListProvider>
    );
};

export default GroceryList;
