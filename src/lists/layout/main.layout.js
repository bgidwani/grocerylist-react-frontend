import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
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
        <Container>
            <Grid
                container
                justify="space-evenly"
                spacing={5}
                style={{ padding: '5px' }}
            >
                {items.map((item) => (
                    <Grid key={item._id} item>
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
        </Container>
    );
};

export default GroceryListLayout;
