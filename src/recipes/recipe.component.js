import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { useTopNavDataContext } from '../topnav/topnav.provider';
import RecipeResults from './recipe.result.component';
import RecipeService from './recipe.service';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        margin: theme.spacing(1),
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    searchgroup: {
        height: 75,
        borderRadius: 3,
        margin: theme.spacing(1),
    },
    searchtext: {
        borderRadius: 3,
        height: 40,
        padding: '0 30px',
        fontSize: 'larger',
        marginRight: theme.spacing(1),
    },
    searchbutton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        fontSize: 'larger',
        marginTop: theme.spacing(2),
    },
    searchresult: {
        paddingTop: '30px',
    },
}));

const Recipes = () => {
    const classes = useStyles();
    const { setTitle } = useTopNavDataContext();
    const [search, setSeach] = useState('');
    const [recipes, setRecipes] = useState([]);

    useEffect(() => setTitle('Recipes'), []);

    const handleChange = (e) => {
        setSeach(e.target.value);
    };

    const handleSearch = async (e) => {
        let data = await RecipeService.search(search);
        //console.log('Response data', data);
        setRecipes(data);
    };

    return (
        <div className={classes.root}>
            <Paper elevation={2} className={classes.searchgroup}>
                <input
                    type="text"
                    name="txtsearch"
                    placeholder="enter ingredient to search"
                    className={classes.searchtext}
                    onChange={handleChange}
                />

                <button
                    type="button"
                    className={classes.searchbutton}
                    onClick={handleSearch}
                >
                    Search
                </button>
            </Paper>

            <Paper elevation={2} className={classes.searchresult}>
                <Grid container spacing={10} style={{ padding: '24px' }}>
                    {recipes.map((recipeitem) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                            <RecipeResults recipe={recipeitem} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </div>
    );
};

export default Recipes;
