import { useReducer } from 'react';

import { ADD_FARMER, ADD_BUYER, FARMERS_FETCHED, GROUP_ADDED, POST_ADDED, POST_TARGET_ADDED } from "../actions/userDataCreator";

import { updateObject } from "../../utils/stateUpdater";

const initialState = {
    farmerData: '',
    buyerData: '',
    farmersData: '',
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FARMER:
            updateObject(state, {
                farmerData: action.farmer
            });
            return {
                farmerData: action.farmer
            };
        case ADD_BUYER:
            updateObject(state, {
                buyerData: action.buyer
            });
            return {
                buyerData: action.buyer
            };
        case FARMERS_FETCHED:
            updateObject(state, {
                farmersData: action.farmers
            });
            return {
                farmersData: action.farmers
            };
        case GROUP_ADDED: {
            updateObject(state, {
                farmersData: action.farmers
            });
            return {
                farmersData: action.farmers
            };
         
        }
        case POST_ADDED: {
            updateObject(state, {
                farmersData: action
            });
            return {
                farmersData: action
            };
         
        }
        case POST_TARGET_ADDED: {
            updateObject(state, {
                farmersData: action
            });
            return {
                farmersData: action
            };
         
        }
        default:
            return state;
    }
}

export default () => useReducer(reducer, initialState);