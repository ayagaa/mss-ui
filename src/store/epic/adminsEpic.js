import * as adminService from "../../services/adminService";
import {adminsReceived} from "../actions/adminsCreator";

export function getAdmins(dispatch) {
    return adminService.getAdmins()
    .then(response => {dispatch(adminsReceived(response))} );
}