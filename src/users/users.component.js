import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import userStyles from './users.styles';

class Users extends Component {
    render() {
        const { classes } = this.props;

        return <h2>User list</h2>;
    }
}

export default withStyles(userStyles)(Users);
