export const GET_ADMINISTRATION_DATA = 'GET_ADMINISTRATION_DATA';

export function adminsReceived(admins) {
    return {
        type: GET_ADMINISTRATION_DATA,
        admins
    };
}