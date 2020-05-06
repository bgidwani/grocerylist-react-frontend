import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuthDataContext } from './auth-provider';

import Login from './login/login.component';
import GroceryList from './lists/grocerylist.component';

const PrivateRoute = ({ component, ...options }) => {
    const { user } = useAuthDataContext();
    const finalComponent = user ? component : Login;

    return <Route {...options} component={finalComponent} />;
};

const Router = () => {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/" component={GroceryList} />
        </Switch>
    );
};

export default Router;
