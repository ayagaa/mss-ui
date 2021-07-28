import { useReducer } from 'react';

import {AUTH_STATUS} from '../actions/userAuthCreator';

import { updateObject } from "../../utils/stateUpdater";

const initialState = {
    authUser: null,
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_STATUS:
            updateObject(state, {
                authUser: action.userResponse
            });
            return {
                authUser: action.userResponse
            };
        default:
            return state;
    }
}

export default () => useReducer(reducer, initialState);