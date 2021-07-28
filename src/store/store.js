import search from "./reducers/locationSearchReducer";
import admins from "./reducers/adminsReducer";
import valueChains from "./reducers/valueChainsReducer";
import userData from "./reducers/userDataReducer";
import authUser from "./reducers/userAuthReducer";

export default function createStore() {
    return {
        search: search(),
        admins: admins(),
        valueChains: valueChains(),
        userData: userData(),
        authUser: authUser()
    };
}