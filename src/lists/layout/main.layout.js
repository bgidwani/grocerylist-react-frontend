import React from 'react';
import { Grid, Container, Snackbar, Zoom } from '@material-ui/core';

import GroceryItemCard from './groceryitem.layout';
import AddListComponent from './components/add.list';
import { useGroceryListContext } from '../context/grocerylist-provider';
import MuiAlert from '@material-ui/lab/Alert';
import EmptyList from './components/empty.lists';

const GroceryListLayout = (props) => {
    const { items, toastMessage, setToast } = useGroceryListContext();
    //const { classes } = props;

    const toggleToastClose = () => {
        setToast(null);
    };

    return (
        <Container>
            {items.length > 0 && (
                <Grid
                    container
                    justify="space-evenly"
                    spacing={5}
                    style={{ marginTop: '5px', padding: '5px' }}
                >
                    {items.map((item, index) => (
                        <Zoom
                            key={item._id}
                            in
                            style={{
                                transitionDelay: `${index * 250}ms`,
                            }}
                        >
                            <Grid key={item._id} item>
                                <GroceryItemCard
                                    listid={item._id}
                                    name={item.name}
                                    items={item.items}
                                />
                            </Grid>
                        </Zoom>
                    ))}
                </Grid>
            )}
            {items.length === 0 && <EmptyList />}
            {toastMessage && (
                <Snackbar
                    open={toastMessage !== ''}
                    autoHideDuration={2000}
                    onClose={toggleToastClose}
                >
                    <MuiAlert elevation={6} variant="filled" severity="error">
                        {toastMessage}
                    </MuiAlert>
                </Snackbar>
            )}
            <AddListComponent />
        </Container>
    );
};

export default GroceryListLayout;
