import * as valueChainService from "../../services/valueChainService";
import {valueChainsReceived} from "../actions/valueChainsCreator";

export function getValueChains(dispatch) {
    return valueChainService.getValueChains()
    .then(response => {dispatch(valueChainsReceived(response))} );
}