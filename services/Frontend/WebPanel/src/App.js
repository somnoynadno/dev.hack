import React from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {LoginPage} from "./view/pages/LoginPage";
import {IndexPage} from "./view/pages/IndexPage";
import {RegisterPage} from "./view/pages/RegisterPage";


function App() {
    return (
        <Switch>
            <Route exact path='/register' component={RegisterPage}/>
            <Route exact path='/login' component={LoginPage}/>
            <Route exact path='/logout' component={Logout}/>
            <Route path='/' component={IndexPage}/>
        </Switch>
    );
}

function Logout() {
    localStorage.removeItem('token');
    return <Redirect to={'/login'}/>
}

export default withRouter(App);
