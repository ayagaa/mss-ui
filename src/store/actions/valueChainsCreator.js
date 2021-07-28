export const GET_VALUE_CHAINS = 'GET_VALUE_CHAINS';

export function valueChainsReceived(valueChains) {
    return {
        type: GET_VALUE_CHAINS,
        valueChains
    };
}