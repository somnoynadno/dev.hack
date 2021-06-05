import React from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {LoginPage} from "./view/pages/LoginPage";


function App() {
    return (
        <Switch>
            <Route exact path='/login' component={LoginPage}/>
            <Route exact path='/logout' component={Logout}/>
        </Switch>
    );
}

function Logout() {
    localStorage.removeItem('token');
    return <Redirect to={'/login'}/>
}

export default withRouter(App);
