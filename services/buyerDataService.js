import {post, put} from "./apiService";

const ADD_BUYER_URL = '';
const UPDATE_BUYER_URL = '';

export function addBuyer(query, data){
    return post(ADD_BUYER_URL, {query, data});
}

export function updateBuyer(query, data) {
    return put(UPDATE_BUYER_URL, {query, data});
}