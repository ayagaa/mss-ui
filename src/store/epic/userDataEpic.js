import * as userDataService from "../../services/userDataService";

import {farmerAdded, buyerAdded, farmersFetched, groupAdded, postAdded} from "../actions/userDataCreator";

export function addFarmer(farmerData, dispatch){
    return userDataService.addFarmer(farmerData)
    .then(response => { dispatch(farmerAdded(response))});
}

export function addPost(farmerData, dispatch){
    return userDataService.addPost(farmerData)
    .then(response => { dispatch(postAdded(response))});
}

export function addGroup(farmerData, id, dispatch){
    return userDataService.addGroup(farmerData, id)
    .then(response => { dispatch(groupAdded(response))});
}

export function addBuyer(buyerData, dispatch){
    return userDataService.addBuyer(buyerData)
    .then(response => {dispatch(buyerAdded(response))});
}

export function fetchFarmers(dispatch){
    return userDataService.getFarmers().then(response => { dispatch(farmersFetched(response)) });
}