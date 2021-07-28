import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import {
  Map as LeafletMap,
  GeoJSON,
  Marker,
  TileLayer,
  ZoomControl,
  ScaleControl,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import * as focus from "../../store/actions/actionTypes";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Legend from "../legend/legend";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [17, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

let centerPosition = [];
let pointZoom = 0;

let legendData = null;

let geojsonBounds = [
  [36.7483, -1.3166],
  [36.8736, -1.238],
];


class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = null;

    // this.state = { lat: -1.2702, lng: 36.8041, zoom: 5 };
    this.state = { lat: -0.4, lng: 37.8041, zoom: 6, mapGeoJson: null };
    centerPosition = [this.state.lat, this.state.lng];
    pointZoom = this.state.zoom;
  }
  
  componentDidMount() {
    console.log(centerPosition);
    const map = this.mapRef.leafletElement;
  }

  getCoordinates(event) {
    if (event && event.latlng) {
      const { pointSelected } = this.props;

      centerPosition = [event.latlng.lat, event.latlng.lng];
      pointSelected(event.latlng);
    }
  }

  guidPart() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  getFeatureColor(feature, focusData) {
    if (
      feature.properties.gridMeasures &&
      feature.properties.gridMeasures.length > 0 &&
      focusData
    ) {
      if (focusData === focus.ACCUMULATIONS_MAP_RECEIVED) {
        return feature.properties.gridMeasures[0].currentValueColor;
      }
      if (focusData === focus.COMPARISON_MAP_RECEIVED) {
        return feature.properties.gridMeasures[0].differenceValueColor;
      }
      return feature.properties.gridMeasures[0].currentValueColor;
    }
    return "black";
  }

  getFeatureFill(feature, focusData) {
    if (
      feature.properties.gridMeasures &&
      feature.properties.gridMeasures.length > 0 &&
      focusData
    ) {
      if (focusData === focus.ACCUMULATIONS_MAP_RECEIVED) {
        return feature.properties.gridMeasures[0].currentValueColor;
      }
      if (focusData === focus.COMPARISON_MAP_RECEIVED) {
        return feature.properties.gridMeasures[0].differenceValueColor;
      }
      return feature.properties.gridMeasures[0].currentValueColor;
    }
    return "transparent";
  }

  getFeatureStroke(feature) {
    if (
      feature.properties.gridMeasures &&
      feature.properties.gridMeasures.length > 0
    ) {
      return 0;
    }
    return 1;
  }

  renderLocationDetails(resultDetails, renderAdminMap, focusOn) {
    if (resultDetails && !renderAdminMap) {
      const guid = (
        this.guidPart() +
        this.guidPart() +
        this.guidPart().substr(0, 3) +
        "-" +
        this.guidPart() +
        "-" +
        this.guidPart() +
        this.guidPart() +
        this.guidPart()
      ).toLowerCase();
      const obj = resultDetails;
      const map = this.mapRef.leafletElement;
      if (obj && obj.length > 0) {
        const data = JSON.parse(obj);
        const bbox = require("geojson-bbox");

        if (data.mapData) {
          centerPosition = [data.location.latitude, data.location.longitude];
          const geojson = data.mapData.features.find(
            (map) => map.geometry.type === "LineString"
          );
          if (geojson) {
            const bounds = bbox(geojson);
            const corner1 = [bounds[(0, 0)], bounds[(0, 1)]];
            const corner2 = [bounds[(0, 2)], bounds[(0, 3)]];
            const resultBounds = [corner1, corner2];
            geojsonBounds = resultBounds;
            pointZoom = map.getBoundsZoom(resultBounds, false);
          }

          return (
            <GeoJSON
              key={guid}
              data={data.mapData}
              style={(feature) => ({
                color: "red",
                fill: "true",
                fillColor: "transparent",
                fillOpacity: 0.6,
                weight: 3,
              })}
            />
          );
        } else {
          return null;
        }
      }
    } else if (resultDetails && renderAdminMap && focusOn) {
      const guid = (
        this.guidPart() +
        this.guidPart() +
        this.guidPart().substr(0, 3) +
        "-" +
        this.guidPart() +
        "-" +
        this.guidPart() +
        this.guidPart() +
        this.guidPart()
      ).toLowerCase();

      legendData = resultDetails.legend;
      const data = resultDetails;
      if (data.features.length > 0) {
        centerPosition = [this.state.lat, this.state.lng];
        const geojson = data.features.find(
          (map) => map.geometry.type === "LineString"
        );
        return (
          <GeoJSON
            key={guid}
            data={data}
            style={(feature) => ({
              color: this.getFeatureColor(feature, focusOn),
              fill: "true",
              fillColor: this.getFeatureFill(feature, focusOn),
              fillOpacity: 0.5,
              weight: this.getFeatureStroke(feature),
            })}
          />
        );
      }
    } else {
      return null;
    }
  }

  renderStakeHolders(stakeholdersData){
    if(stakeholdersData){
      const guid = (
        this.guidPart() +
        this.guidPart() +
        this.guidPart().substr(0, 3) +
        "-" +
        this.guidPart() +
        "-" +
        this.guidPart() +
        this.guidPart() +
        this.guidPart()
      ).toLowerCase();

      return (
        <GeoJSON
          key={guid}
          data={stakeholdersData}
          style={(feature) => ({
            color: "red",
            fill: "true",
            fillColor: "transparent",
            fillOpacity: 0.6,
            weight: 3,
          })}
        />)

    }else{
      return null;
    }
  }

  render() {
    const {
      resultDetails,
      renderAdminMap,
      stakeholdersMapData,
      focusOn,
    } = this.props;

    console.log(stakeholdersMapData);
    const mapRender = this.renderLocationDetails(
      resultDetails,
      renderAdminMap,
      focusOn
    );
    const stakeholdersRender = this.renderStakeHolders(
      stakeholdersMapData
    );

    const position = centerPosition;

    return (
      <div className="map-container">
        <LeafletMap
          style={{ width: "100%", height: "100%" }}
          center={position}
          zoom={pointZoom}
          maxZoom={20}
          attributionControl={true}
          zoomControl={false}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          ondblclick={(event) => this.getCoordinates(event)}
          easeLinearity={0.35}
          ref={(LeafletMap) => {
            this.mapRef = LeafletMap;
          }}
        >
          <ScaleControl position="bottomright" />
          <ZoomControl position="bottomright" />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a> Powered by GeoWAIS'
            // url="http://192.168.94.83:3031/styles/positron/{z}/{x}/{y}.png"
            url="http://138.68.144.98:3031/styles/osm-bright/{z}/{x}/{y}.png"
          />
          <Marker position={centerPosition}></Marker>
          {/* {stakeholdersData.map((stakeholder) => (
            <Marker position={centerPosition}></Marker>
          ))} */}
          {stakeholdersRender}
          {mapRender}

          <Legend legendData={legendData} />
        </LeafletMap>
      </div>
    );
  }
}

export default Map;
