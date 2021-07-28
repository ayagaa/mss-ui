export const AUTH_STATUS = "AUTH_STATUS";

export function userAuthenticated(userResponse){
    return{
        type: AUTH_STATUS,
        userResponse
    };
}