import React from "react";
import { Route, Switch } from "react-router-dom";
import  LoginForm  from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import BuyerView from './components/BuyerView/BuyerView';
import FarmerView from './components/FarmerView/FarmerView';
import AdminView from './components/AdminView/AdminView';

const BaseRouter = () => (
    <Switch>
        <Route exact path='/' component={LoginForm}/>
        <Route exact path='/registration-form' component={RegistrationForm}/>
        <Route exact path='/buyer-view' component={BuyerView}/>
        <Route exact path='/farmer-view' component={FarmerView}/>
        <Route exact path='/admin-view' component={AdminView}/>
    </Switch>
);

export default BaseRouter;