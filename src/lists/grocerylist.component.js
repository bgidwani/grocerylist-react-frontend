import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import groceryListStyles from './grocerylist.styles';
import GroceryListService from './grocerylist.service';
import GroceryListLayout from './grocerylist.layout';

class GroceryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
        };
    }

    componentDidMount() {
        GroceryListService.getAll().then((data) => {
            this.setState({
                list: data,
            });
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <GroceryListLayout
                classes={this.props.classes}
                parentState={this.state}
            />
        );
    }
}

export default withStyles(groceryListStyles)(GroceryList);
