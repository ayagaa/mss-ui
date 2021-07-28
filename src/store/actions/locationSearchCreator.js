export const LOCATIONS_RECEIVED = 'LOCATIONS_RECEIVED';
export const LOCATION_RESULTS_RECEIVED = 'LOCATION_RESULTS_RECEIVED';
export const LOCATION_DATA_RECEIVED = 'LOCATION_DATA_RECEIVED';
export const RESET_LOCATION = 'RESET_LOCATION';
export const MAP_03_RECEIVED = 'MAP_RECEIVED';
export const WEATHER_DATA_RECEIVED = 'WEATHER_DATA_RECEIVED';

export function locationsReceived(locations) {
    return {
        type: LOCATIONS_RECEIVED,
        locations
    };
}

export function locationResultsReceived(locationResults) {
    return {
        type: LOCATION_RESULTS_RECEIVED,
        locationResults
    };
}

export function locationDataReceived(locationData) {
    return {
        type: LOCATION_DATA_RECEIVED,
        locationData
    };
}

export function weatherDataReceived(weatherData) {
    return {
        type: WEATHER_DATA_RECEIVED,
        weatherData
    };
}

export function locationsReset() {
    return {
        type: RESET_LOCATION,
        locations: ''
    }
}

export function map03Received(map03GeoJson) {
    return{
        type: MAP_03_RECEIVED,
        map03GeoJson
    }
}