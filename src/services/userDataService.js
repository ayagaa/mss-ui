import {post, put, get} from './apiService';

const ADD_FARMER_URL = 'http://138.68.144.98/api/farmers/register';

const GET_FARMERS_URL = 'http://138.68.144.98/api/farmers';

const ADD_BUYER_URL = 'http://138.68.144.98/api/buyers/register';

const ADD_USER_URL = 'http://138.68.144.98/api/fgd/registeruser';

const ADD_GROUP_URL = 'http://138.68.144.98/api/fgd/register';


const ADD_POST_URL = 'http://138.68.144.98/api/fgd/makepost';

const ADD_POST_TARGET_URL = 'http://138.68.144.98/api/fgd/targetpost';

// const ADD_FARMER_URL = 'http://localhost:5000/api/farmers/register';

// const GET_FARMERS_URL = 'http://localhost:5000/api/farmers';

// const ADD_BUYER_URL = 'http://localhost:5000/api/buyers/register';

export function addBuyer(data){
    return post(ADD_BUYER_URL, {}, JSON.stringify(data));
}

// export function addFarmer(data) {
//     return post(ADD_FARMER_URL, {}, JSON.stringify(data));
// }

export function addGroup(data, group) {
    return post(ADD_GROUP_URL, {group}, JSON.stringify(data));
}

export function addPost(data) {
    return post(ADD_POST_URL, {}, JSON.stringify(data));
}

export function targetPost(data) {
    return post(ADD_POST_TARGET_URL, {}, JSON.stringify(data));
}

export function addFarmer(data) {
    return post(ADD_USER_URL, {}, JSON.stringify(data));
}

export function getFarmers() {
    return get(GET_FARMERS_URL);
}