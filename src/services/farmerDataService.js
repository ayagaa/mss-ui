import {post, put} from './apiService';

const ADD_FARMER_URL = '';
const UPDATE_FARMER_URL = '';

export function addFarmer(query, data) {
    return post(ADD_FARMER_URL, {query, data});
}

export function updateFarmer(query, data) {
    return put(UPDATE_FARMER_URL, {query, data});
}