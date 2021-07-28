import {get} from "./apiService";

const GET_VALUE_CHAINS_URL = "http://138.68.144.98/api/valuechain/types";

// const GET_VALUE_CHAINS_URL = "http://localhost:5000/api/valuechain/types";

export function getValueChains() {
    return get(GET_VALUE_CHAINS_URL);
}