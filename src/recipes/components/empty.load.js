import React from 'react';
import { Animator } from 'lottie-react';
import emptyData from '../../assets/lottie/empty.recipe.load.json';
import { Container, Typography } from '@material-ui/core';

const InitialRecipeLoad = () => {
    return (
        <Container
            maxWidth="md"
            style={{
                border: '3px',
                borderStyle: 'solid',
                borderRadius: '7px',
            }}
        >
            <Typography variant="overline" display="block" gutterBottom>
                Wondering what to look for, try 'chicken'
            </Typography>

            <Animator style={{ height: '400px' }} animationData={emptyData} />
        </Container>
    );
};

export default InitialRecipeLoad;
