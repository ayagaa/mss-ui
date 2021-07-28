import { useReducer } from 'react';

import {GET_ADMINISTRATION_DATA} from "../actions/adminsCreator";

import { updateObject } from "../../utils/stateUpdater";

const initialState = {
    admins: ''
}

export function reducer(state = initialState, action){
    switch(action.type){
        case GET_ADMINISTRATION_DATA:
            updateObject(state, {
                admins: action.admins
            });
            return {
                admins: action.admins
            }
            default:
                return {
                    admins: action.admins
                }
    }
}

export default () => useReducer(reducer, initialState);