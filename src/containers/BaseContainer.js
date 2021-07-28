import React from 'react';
import store from "../store/store";
import App from '../App';

export default function BaseContainer() {
    window.store = store();
    return (
        <App/>
    );
}