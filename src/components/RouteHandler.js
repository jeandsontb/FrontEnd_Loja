import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoged } from '../helpers/AuthHandler';

export default ({ children, ...rest }) => {

    let loged = isLoged();
    let authorized = (rest.private && !loged) ? false : true; 

    return (
        <Route 
            {...rest}
            render={() => 
                authorized ? children : <Redirect to="/signin" />
            }
        />
    );
}