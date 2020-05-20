import React from 'react';
import { Animator } from 'lottie-react';
import emptyListData from '../../../assets/lottie/groovy_walk.json';
import { Container, Typography } from '@material-ui/core';

const EmptyList = () => {
    return (
        <Container
            maxWidth="sm"
            style={{
                border: '3px',
                borderStyle: 'solid',
                borderRadius: '7px',
                marginTop: '20px',
                //backgroundColor: '#3490dc'
            }}
        >
            <Animator
                style={{ height: '500px' }}
                animationData={emptyListData}
            />
            <Typography variant="overline" display="block" gutterBottom>
                Feeling a bit lonely here, try adding a list
            </Typography>
        </Container>
    );
};

export default EmptyList;
