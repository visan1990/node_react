import React, { useEffect, useState } from "react";
import { Route, Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { createBrowserHistory } from "history";

import { useAuth } from "../auth/AuthProvider";
import PublicRoutes from "./Rutaspublicas";
import PrivateRoutes from "./Rutasprivadas";

const history = createBrowserHistory();

const Routes = ( { ...rest } ) => {

    const [ paginasUsuario, setPaginasUsuario ] = useState([]);
    const authUser = useAuth();

    useEffect( () => {
        if( authUser.isLoggedIn )
            setPaginasUsuario( PrivateRoutes() );
        else
            setPaginasUsuario( PublicRoutes() );

    }, [ authUser.isLoggedIn ] );

    return (
        <Router history={history}>
            <Route {...rest} render={( props ) => renderRoutes(paginasUsuario)} />
        </Router>
    );
};

export default Routes;
