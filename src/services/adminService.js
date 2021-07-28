import {get} from "./apiService";

const GET_ADMINS_URL = 'http://138.68.144.98/api/admins/counties';

export function getAdmins() {
    return get(GET_ADMINS_URL);
}