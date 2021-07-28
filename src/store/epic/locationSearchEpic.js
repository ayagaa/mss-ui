// import { get } from "../../services/apiService";
import * as locationSearchService from "../../services/locationSearchService";
import { locationsReceived, locationResultsReceived, locationDataReceived, adminsReceived, locationsReset, map03Received, weatherDataReceived } from "../actions/locationSearchCreator";

export function getLocations(locationName, admin03, getForecastData, dispatch) {
    return locationSearchService.getLocations((locationName ? locationName : 'Nairobi'), admin03, getForecastData)
        .then(response => { dispatch(locationDataReceived(response)) });
}

export function get03Map(admin01, admin02, admin03, dispatch) {
    return locationSearchService.get03Map(admin01, admin02, admin03)
    .then(response => { dispatch(map03Received(response)) });
}

export function getWeatherData(latitude, longitude, dispatch) {
    return locationSearchService.getWeatherData(latitude, longitude)
    .then(response => { dispatch(weatherDataReceived(response)) });
}

