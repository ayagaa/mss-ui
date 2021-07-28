import { useReducer } from 'react';

import { LOCATIONS_RECEIVED, LOCATION_RESULTS_RECEIVED, LOCATION_DATA_RECEIVED, RESET_LOCATION, MAP_03_RECEIVED, WEATHER_DATA_RECEIVED } from "../actions/locationSearchCreator";

import { updateObject } from "../../utils/stateUpdater";

const initialState = {
    locations: '',
    locationResults: '',
    locationData: '',
    resetData: '',
    map03GeoJson: '',
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case LOCATIONS_RECEIVED:
            updateObject(state, {
                locations: action.locations
            });
            return {
                locations: action.locations,
                locationResults: action.locationResults,
                locationData: action.locationData,
                resetData: action.resetData,
                map03GeoJson: action.map03GeoJson
            }
        case LOCATION_RESULTS_RECEIVED:
            updateObject(state, {
                locationResults: action.locationResults
            });
            return {
                locations: action.locations,
                locationResults: action.locationResults,
                locationData: action.locationData,
                resetData: action.resetData,
                map03GeoJson: action.map03GeoJson
            }
        case LOCATION_DATA_RECEIVED:
            updateObject(state, {
                locationData: action.locationData
            });
            return {
                locations: action.locations,
                locationResults: action.locationResults,
                locationData: action.locationData,
                resetData: action.resetData,
                map03GeoJson: action.map03GeoJson
            }
        case RESET_LOCATION:
            updateObject(state, {
                resetData: action.resetData
            });
            return {
                locations: action.locations,
                locationResults: action.locationResults,
                locationData: action.locationData,
                resetData: action.resetData,
                map03GeoJson: action.map03GeoJson
            }
        case MAP_03_RECEIVED:
            updateObject(state, {
                map03GeoJson: action.map03GeoJson
            });
            return {
                locations: action.locations,
                locationResults: action.locationResults,
                locationData: action.locationData,
                resetData: action.resetData,
                map03GeoJson: action.map03GeoJson
            }
        case WEATHER_DATA_RECEIVED:
            updateObject(state, {
                weatherData: action
            });
            return {
                weatherData: action.weatherData
            }
        default:
            return state;
    }
}

export default () => useReducer(reducer, initialState);