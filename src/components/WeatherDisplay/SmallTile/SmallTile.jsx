import React, { Component } from "react";

import "./SmallTile.css";
import Moment from "react-moment";
import WeatherIcon from "../icons/icons";

export default class SmallTile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  tileSelected(e) {
    const { tileClicked, tileIndex } = this.props;
    if (tileClicked) {
      tileClicked(tileIndex);
    }
  }

  render() {
    const { showDaily, weatherData, tileIndex, getConditionIconId } =
      this.props;

    let timeFormat = showDaily ? "ddd" : "HH:mm";
    return (
      <div
        className="small-tile-container"
        onClick={(e) => this.tileSelected(tileIndex)}
      >
        <div className="small-tile-time">
          <div>
            <Moment format={timeFormat}>{weatherData.startTime}</Moment>
          </div>
          <div>
            <Moment
              className={showDaily ? "show-date" : "hide-date"}
              format="DD MMM"
            >
              {weatherData.startTime }
            </Moment>
          </div>
        </div>
        <div className="small-tile-icon">
          <WeatherIcon
            key={tileIndex}
            iconIndex={tileIndex}
            iconId={getConditionIconId(weatherData.conditionsCode)}
          />
        </div>
        <div className="small-tile-temp">
          <p className="max">
            {Math.round(weatherData.temperatures["max"], 0)} °C
          </p>
          <p className="min">
            {Math.round(weatherData.temperatures["min"], 0)} °C
          </p>
        </div>
        <div className="small-tile-precip">
          <p className="precip">
            {Math.round(weatherData.precipitation["chance"], 0)}%
          </p>
        </div>
      </div>
    );
  }
}
