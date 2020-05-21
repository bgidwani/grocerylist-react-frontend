import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Zoom, Grid, Typography } from '@material-ui/core';
import { Animator } from 'lottie-react';

import { useTopNavDataContext } from '../topnav/topnav.provider';
import RecipeCard from './components/recipe.card';
import RecipeService from './recipe.service';
import RecipeSearchBar from './components/searchbar.recipe';
import InitialRecipeLoad from './components/empty.load';
import searchingData from '../assets/lottie/searching.json';

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
        paddingTop: '20px',
    },
}));

const defaultRecipes = [];

const Recipes = () => {
    const classes = useStyles();
    const { setTitle } = useTopNavDataContext();
    const [initialLoad, setInitialLoad] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [recipes, setRecipes] = useState(defaultRecipes);

    useEffect(() => setTitle('Recipes'));

    const handleSearch = async (term) => {
        setInitialLoad(false);
        setLoading(true);
        setError(false);

        setRecipes(defaultRecipes);

        try {
            let data = await RecipeService.search(term);
            if (Array.isArray(data)) {
                setRecipes(data);
            } else {
                setError(true);
            }
        } catch (err) {
            console.log(err);
            setError(true);
        }

        //console.log('Response data', data);
        setLoading(false);
    };

    return (
        <div className={classes.root}>
            <RecipeSearchBar handleSearch={handleSearch} />

            <Paper elevation={2} className={classes.searchresult}>
                <Grid
                    container
                    justify="space-evenly"
                    spacing={5}
                    style={{
                        marginTop: '5px',
                        padding: '5px',
                        paddingBottom: '50px',
                    }}
                >
                    {initialLoad && <InitialRecipeLoad />}
                    {loading && (
                        <Grid item xs={12}>
                            <Animator
                                style={{ height: '400px' }}
                                animationData={searchingData}
                            />
                        </Grid>
                    )}
                    {error && (
                        <Grid item xs={12}>
                            <Typography
                                variant="overline"
                                display="block"
                                color="error"
                                gutterBottom
                            >
                                Something went wrong
                            </Typography>
                        </Grid>
                    )}
                    {recipes.map((recipeitem, index) => (
                        <Zoom
                            key={recipeitem._id}
                            in
                            style={{
                                transitionDelay: `${index * 200}ms`,
                            }}
                        >
                            <Grid key={recipeitem._id} item>
                                <RecipeCard recipe={recipeitem} />
                            </Grid>
                        </Zoom>
                    ))}
                </Grid>
            </Paper>
        </div>
    );
};

export default Recipes;
