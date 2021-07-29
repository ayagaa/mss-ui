import React from "react";
import { Route, Switch } from "react-router-dom";
import  LoginForm  from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import BlogView from './components/BlogView/BlogView';

const BaseRouter = () => (
    <Switch>
        <Route exact path='/' component={LoginForm}/>
        <Route exact path='/registration-form' component={RegistrationForm}/>
        <Route exact path='/posts' component={BlogView}/>
    </Switch>
);

export default BaseRouter;