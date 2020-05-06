import React, { createContext, useState, useEffect, useContext } from 'react';
import GroceryListService from '../grocerylist.service';

export const GroceryListContext = createContext(null);

const initialData = [];

const GroceryListProvider = (props) => {
    const [items, setData] = useState(initialData);

    /* The first time the component is rendered, it tries to
     * fetch the auth data from a source, like a cookie or
     * the localStorage.
     */
    useEffect(() => {
        refreshList();
    }, []);

    const refreshList = async () => {
        const list = await GroceryListService.getAll();
        if (list) {
            setData(list);
        }
    };

    return (
        <GroceryListContext.Provider
            value={{ items, refreshList }}
            {...props}
        />
    );
};

export const useGroceryListContext = () => useContext(GroceryListContext);

export default GroceryListProvider;
