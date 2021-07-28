import * as userAuthService from '../../services/userAuthService';
import {userAuthenticated} from '../actions/userAuthCreator';

export function authenticateUser(userData, dispatch){
    return userAuthService.authenticateUser(userData)
    .then(response => {dispatch(userAuthenticated(response))});
}