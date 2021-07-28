import { useReducer } from 'react';

import {GET_VALUE_CHAINS} from "../actions/valueChainsCreator";

import { updateObject } from "../../utils/stateUpdater";

const initialState = {
    valueChains: ''
}

export function reducer(state = initialState, action){
    switch(action.type){
        case GET_VALUE_CHAINS:
            updateObject(state, {
                valueChains: action.valueChains
            });
            return {
                valueChains: action.valueChains
            }
            default:
                return {
                    valueChains: action.valueChains
                }
    }
}

export default () => useReducer(reducer, initialState);