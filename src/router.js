import React from 'react';
import { Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';
import { useAuthDataContext } from './auth-provider';

import Login from './login/login.component';
import GroceryList from './lists/grocerylist.component';
import Recipes from './recipes/recipe.component';

const PrivateRoute = ({ component, ...options }) => {
    const { user } = useAuthDataContext();
    const finalComponent = user ? component : Login;

    return <Route {...options} component={finalComponent} />;
};

const Router = () => {
    const history = createHistory();
    history.listen((location) => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    });

    React.useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/recipes" component={Recipes} />
            <PrivateRoute path="/" component={GroceryList} />
        </Switch>
    );
};

export default Router;
