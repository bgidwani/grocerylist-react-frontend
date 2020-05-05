import React from 'react';
import Grid from '@material-ui/core/Grid';
import GroceryItemCard from './groceryitem.layout';
import GroceryItemAddCard from './groceryitem-add.layout';

const GroceryListLayout = (props) => {
    const { classes, parentState } = props;

    return (
        <div className={classes.root}>
            <Grid container spacing={10} style={{ padding: '24px' }}>
                {parentState.list.map((item) => (
                    <Grid
                        key={item._id}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                        xl={3}
                    >
                        <GroceryItemCard name={item.name} items={item.items} />
                    </Grid>
                ))}
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={3}
                    alignItems="center"
                    justify="center"
                >
                    <GroceryItemAddCard />
                </Grid>
            </Grid>
        </div>
    );
};

export default GroceryListLayout;
