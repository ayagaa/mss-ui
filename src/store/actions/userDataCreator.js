export const ADD_FARMER = 'ADD_FARMER';

export const ADD_BUYER = 'ADD_BUYER';

export const UPDATE_FARMER = 'UPDATE_FARMER';

export const UPDATE_BUYER = 'UPDATE_BUYER';

export const FARMERS_FETCHED = 'FARMERS_FETCHED';

export const GROUP_ADDED = 'GROUP_ADDED';

export const POST_ADDED = 'POST_ADDED';

export function farmersFetched(farmers){
    return {
        type: FARMERS_FETCHED,
        farmers
    };
}


export function postAdded(farmer){
    return {
        type: POST_ADDED,
        farmer
    };
}

export function groupAdded(farmer){
    return {
        type: GROUP_ADDED,
        farmer
    };
}

export function farmerAdded(farmer) {
    return {
        type: ADD_FARMER,
        farmer
    };
}

export function buyerAdded(buyer) {
    return {
        type: ADD_BUYER,
        buyer
    };
}

export function farmerUpdated(farmer) {
    return {
        type: UPDATE_FARMER,    
        farmer
    };
}

export function buyerUpdated(buyer) {
    return {
        type: UPDATE_BUYER,
        buyer
    };
}