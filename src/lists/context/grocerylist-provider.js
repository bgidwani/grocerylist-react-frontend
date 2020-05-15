import React, { createContext, useState, useEffect, useContext } from 'react';
import GroceryListService from '../grocerylist.service';
import { useAuthDataContext } from '../../auth-provider';

export const GroceryListContext = createContext(null);

const initialData = [];

const GroceryListProvider = (props) => {
    const [items, setData] = useState(initialData);
    const [toastMessage, setToast] = useState(null);
    const { user, onLogout } = useAuthDataContext();

    /* The first time the component is rendered, it tries to
     * fetch the auth data from a source, like a cookie or
     * the localStorage.
     */
    useEffect(() => {
        refreshList();
    }, []);

    const refreshList = () => {
        if (user) {
            GroceryListService.getAll()
                .then((data) => {
                    setData(data);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        onLogout();
                    } else {
                        console.log(err.response);
                    }
                });
        } else {
            onLogout();
        }
    };

    return (
        <GroceryListContext.Provider
            value={{ items, toastMessage, setToast, refreshList }}
            {...props}
        />
    );
};

export const useGroceryListContext = () => useContext(GroceryListContext);

export default GroceryListProvider;
