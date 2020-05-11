import React from 'react';
import Grid from '@material-ui/core/Grid';
import GroceryItemCard from './groceryitem.layout';
import GroceryItemAddCard from './groceryitem-add.layout';
import { useGroceryListContext } from '../context/grocerylist-provider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const GroceryListLayout = (props) => {
    const { items, toastMessage, setToast } = useGroceryListContext();
    const { classes } = props;

    const toggleToastClose = () => {
        setToast(null);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={10} style={{ padding: '24px' }}>
                {items.map((item) => (
                    <Grid
                        key={item._id}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                        xl={3}
                    >
                        <GroceryItemCard
                            listid={item._id}
                            name={item.name}
                            items={item.items}
                        />
                    </Grid>
                ))}
            </Grid>
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
            <GroceryItemAddCard />
        </div>
    );
};

export default GroceryListLayout;
