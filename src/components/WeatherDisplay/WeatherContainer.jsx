import React, { Component } from "react";

import ScrollArea from "react-scrollbar";
import "./WeatherContainer.css";
import SmallTile from "./SmallTile/SmallTile";
import moment from "moment";
import WeatherIcon from "./icons/icons";
import { guid } from "../../utils/guid";

let geoWeatherData = null;
let currentIndex = 0;

export default class WeatherContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bigTileIndex: 0,
      selectedData: null,
      showDaily: true,
    };
  }

  getConditionIconId(conditionCode) {
    const conditionArray = conditionCode?.split("");
    let iconId = "wi-day-clear-norain-calm";
    if (conditionArray && conditionArray.length === 3) {
      iconId = "";
      if (
        "12345".indexOf(conditionArray[0]) > -1 ||
        "BCDEF".indexOf(conditionArray[0]) > -1
      ) {
        iconId += "wi-day";
      } else if ("6789A".indexOf(conditionArray[0]) > -1) {
        iconId += "wi-night";
      }
      if (iconId.length > 0) {
        if ("12367BC".indexOf(conditionArray[0]) > -1) {
          iconId += "-clear";
        } else if ("4589ADEF".indexOf(conditionArray[0]) > -1) {
          iconId += "-cloudy";
        }

        if ("15".indexOf(conditionArray[1]) > -1) {
          iconId += "-norain";
        } else if ("23".indexOf(conditionArray[1]) > -1) {
          iconId += "-lightrain";
        } else if ("4".indexOf(conditionArray[1]) > -1) {
          iconId += "-storm";
        }

        if ("12".indexOf(conditionArray[2]) > -1) {
          iconId += "-calm";
        } else if ("34".indexOf(conditionArray[2]) > -1) {
          iconId += "-wind";
        } else if ("56".indexOf(conditionArray[2]) > -1) {
          iconId += "-gust";
        }
      }
    }
    return iconId;
  }

  smallTileClicked(selectedIndex) {
    this.setState({ bigTileIndex: selectedIndex });
    currentIndex = selectedIndex;
  }

  checkIfSelected(e) {
    if (e && !e.currentTarget.classList.contains("selected-time")) {
      this.switchTimeTypes();
    }
  }

  displayDaily(e, currentData, showDaily) {
    currentIndex = 0;
    this.checkIfSelected(e);
    this.setState({ selectedData: currentData, showDaily: showDaily });
  }

  displayHourly(e, forecastData, showDaily, index = 0) {
    currentIndex = 0;

    this.checkIfSelected(e);
    this.setState({ selectedData: forecastData, showDaily: showDaily });
  }

  switchTimeTypes() {
    this.setState({ bigTileIndex: 0 });
    let selectedTime = document.querySelector(".selected-time");
    let disabledTime = document.querySelector(".disabled-time");

    selectedTime.classList.remove("selected-time");
    selectedTime.classList.add("disabled-time");

    disabledTime.classList.remove("disabled-time");
    disabledTime.classList.add("selected-time");
  }

  getConditionsText(showDaily, geoWeatherData) {
    if (
      showDaily &&
      geoWeatherData &&
      geoWeatherData.conditionsText
    ) {
      return geoWeatherData.conditionsText.split(",");
    } else if (
      geoWeatherData &&
      geoWeatherData.conditionsText
    ) {
      return geoWeatherData.conditionsText.split(",");
    } else {
      return [
        "No Cloud Conditions",
        "No Rain Conditions",
        "No Wind Conditions",
      ];
    }
  }

  getCurrentTimeSlot(geoWeatherData) {
    const currentDate = moment();
    let timeStartSlot = moment();
    let timeEndSlot = moment();
    let currentTimeIndex = 0;
    for (let i = 0; i < geoWeatherData.length; i++) {
      if (i <= geoWeatherData.length - 1) {
        timeStartSlot = moment(geoWeatherData[i].startTime);
        timeEndSlot = moment(geoWeatherData[i].endTime);
        if (timeStartSlot <= currentDate && timeEndSlot >= currentDate) {
          currentTimeIndex = i;
        }
      }
    }
    return currentTimeIndex;
  }

  getCurrentDateTime(geoWeatherData, currentIndex) {
    return geoWeatherData[currentIndex].startTime;
  }

  render() {
    const { currentData, forecastData, locationData } = this.props;
    const { showDaily } = this.state;

    geoWeatherData = showDaily ? forecastData : currentData?.forecasts;
    let timeFormat = showDaily ? "dddd Do MMM" : "HH:mm";
    let conditionsArray = this.getConditionsText(showDaily, geoWeatherData[currentIndex]?.forecast[0]);

    if (geoWeatherData && geoWeatherData.length > 0) {
      return (
        <div className="display-container">
          <div className="location-data">
            <div className="location-text">
              <p>
                {" "}
                {"Location: "}
                {locationData?.location}
              </p>
              <p>
                {" "}
                {"County: "}
                {locationData?.region1}
              </p>
              <p>
                {" "}
                {"Ward: "}
                {locationData?.region3}
              </p>
            </div>
          </div>
          <div className="time-type">
            {/* <div
              className="time-daily selected-time"
              onClick={(e) => this.displayDaily(e, currentData, true)}
            >
              <h4>Daily</h4>
            </div>
            <div
              className="time-hourly disabled-time"
              onClick={(e) => this.displayHourly(e, forecastData, false)}
            >
              <h4>Hourly</h4>
            </div> */}
          </div>
          <div className="datetime-title">
            <h3>
              {" "}
              {moment(
                geoWeatherData[currentIndex]?.forecast[0]?.startTime
              ).format(timeFormat)}
              {!showDaily
                ? "-" +
                  moment(
                    geoWeatherData[currentIndex]?.forecast[0]?.endTime
                  ).format(timeFormat)
                : ""}{" "}
            </h3>
          </div>
          <div className="weather-description">
            <div className="conditions-text">
              <p> {conditionsArray[0]}</p>
              <p> {conditionsArray[1]}</p>
              <p> {conditionsArray[2]}</p>
            </div>
            <div className="blank"></div>
            <div className="basic-details">
              <p>
                Precipitation :{" "}
                {Math.round(
                  geoWeatherData[currentIndex]?.forecast[0]?.precipitation?.amount,
                  0
                )}{" "}
                {geoWeatherData[currentIndex]?.forecast[0]?.precipitation?.units}
              </p>
              <p>
                Chance :{" "}
                {Math.round(
                  geoWeatherData[currentIndex]?.forecast[0]?.precipitation?.chance,
                  0
                )}{" "}
                %
              </p>
              <p>
                Max Temp :{" "}
                {Math.round(
                  geoWeatherData[currentIndex]?.forecast[0]?.temperatures?.max,
                  0
                )}{" "}
                °{geoWeatherData[currentIndex]?.forecast[0]?.temperatures?.units}
              </p>
              <p>
                Min Temp :{" "}
                {Math.round(
                  geoWeatherData[currentIndex]?.forecast[0]?.temperatures?.min,
                  0
                )}{" "}
                °{geoWeatherData[currentIndex]?.forecast[0]?.temperatures?.units}
              </p>
              <p>
                Wind Speed :{" "}
                {Math.round(
                  geoWeatherData[currentIndex]?.forecast[0]?.wind?.max,
                  0
                )}{" "}
                {geoWeatherData[currentIndex]?.forecast[0]?.wind?.units}
              </p>
            </div>
          </div>
          <div className="big-weather-tile">
            <div className="big-icon">
              <WeatherIcon
                key={"Big-icon"}
                iconIndex={"Big-icon"}
                iconId={this.getConditionIconId(
                  geoWeatherData[currentIndex]?.forecast[0]?.conditionsCode
                )}
              />
            </div>
            <div className="big-temperature">
              <span>
                {" "}
                {Math.round(
                  geoWeatherData[currentIndex]?.forecast[0]?.temperatures?.max,
                  0
                )}
                <sup>
                  °
                  {geoWeatherData[currentIndex]?.forecast[0]?.temperatures?.units}
                </sup>
              </span>
            </div>
          </div>
          <div className="forecast-details">
            <ScrollArea
              speed={0.9}
              className="area"
              contentClassName="details-container"
              horizontal={true}
              swapWheelAxes={true}
              smoothScrolling={true}
            >
              {geoWeatherData.map((forecast, index) => {
                return (
                  <SmallTile
                    tileIndex={index}
                    key={index}
                    getConditionIconId={(conditionCode) =>
                      this.getConditionIconId(conditionCode)
                    }
                    showDaily={showDaily}
                    weatherData={geoWeatherData[index]?.forecast[0]}
                    tileClicked={(index) => this.smallTileClicked(index)}
                  />
                );
              })}{" "}
            </ScrollArea>
          </div>
          <div className="geo-weather-details">
            <div className="w-sky">
              <div className="w-title">
                <h5>Sky</h5>
              </div>
              <div className="w-details">
                <div className="w-detail">
                  Cloud Cover :{" "}
                  {Math.round(
                    geoWeatherData[currentIndex]?.forecast[0]?.sky?.cloudCover,
                    0
                  )}{" "}
                  %
                </div>
                <div className="w-detail">
                  Sunshine :{" "}
                  {Math.round(
                    geoWeatherData[currentIndex]?.forecast[0]?.sky?.sunshine,
                    0
                  )}{" "}
                  %
                </div>
              </div>
            </div>
            <div className="w-humidity">
              <div className="w-title">
                <h5>Humidity</h5>
              </div>
              <div className="w-details">
                <div className="w-detail">
                  Max :{" "}
                  {Math.round(
                    geoWeatherData[currentIndex]?.forecast[0]?.relativeHumidity
                      ?.max,
                    0
                  )}{" "}
                  %
                </div>
                <div className="w-detail">
                  Min :{" "}
                  {Math.round(
                    geoWeatherData[currentIndex]?.forecast[0]?.relativeHumidity
                      ?.min,
                    0
                  )}{" "}
                  %
                </div>
              </div>
            </div>
            <div className="w-solar">
              <div className="w-title">
                <h5>Solar</h5>
              </div>
              <div className="w-details">
                <div className="w-detail">
                  Amount :{" "}
                  {Math.round(
                    geoWeatherData[currentIndex]?.forecast[0]?.solar?.amount,
                    0
                  )}{" "}
                  {geoWeatherData[currentIndex]?.solar?.units}
                </div>
                <div className="w-detail">
                  Average :{" "}
                  {Math.round(
                    geoWeatherData[currentIndex]?.forecast[0]?.solar?.average,
                    0
                  )}{" "}
                  {geoWeatherData[currentIndex]?.forecast[0]?.solar?.units}
                </div>
                <div className="w-detail">
                  Std Deviation :{" "}
                  {Math.round(
                    geoWeatherData[currentIndex]?.forecast[0]?.solar?.stdDev,
                    0
                  )}{" "}
                  {geoWeatherData[currentIndex]?.forecast[0]?.solar?.units}
                </div>
              </div>
            </div>
            <div className="w-dew-point">
              <div className="w-title">
                <h5>Dew Point</h5>
              </div>
              <div className="w-details">
                <div className="w-detail">
                  Amount :{" "}
                  {Math.round(
                    geoWeatherData[currentIndex]?.forecast[0]?.dewPoint?.amount,
                    0
                  )}{" "}
                  °{geoWeatherData[currentIndex]?.forecast[0]?.dewPoint?.units}
                </div>
              </div>
            </div>
            <div className="w-wind">
              <div className="w-title">
                <h5>Wind</h5>
              </div>
              <div className="w-details">
                <div className="w-wind-container">
                  <div className="detail-amount">
                    Amount :{" "}
                    {Math.round(
                      geoWeatherData[currentIndex]?.forecast[0]?.wind?.amount,
                      0
                    )}{" "}
                    {geoWeatherData[currentIndex]?.forecast[0]?.wind?.units}
                  </div>
                  <div className="detail-daymax">
                    Day Max :{" "}
                    {Math.round(
                      geoWeatherData[currentIndex]?.forecast[0]?.wind?.dayMax,
                      0
                    )}{" "}
                    {geoWeatherData[currentIndex]?.forecast[0]?.wind?.units}
                  </div>
                  <div className="detail-mornmax">
                    Morn Max :{" "}
                    {Math.round(
                      geoWeatherData[currentIndex]?.forecast[0]?.wind?.morningMax,
                      0
                    )}{" "}
                    {geoWeatherData[currentIndex]?.forecast[0]?.wind?.units}
                  </div>
                  <div className="detail-average">
                    Average :{" "}
                    {Math.round(
                      geoWeatherData[currentIndex]?.forecast[0]?.wind?.average,
                      0
                    )}{" "}
                    {geoWeatherData[currentIndex]?.forecast[0]?.wind?.units}
                  </div>
                  <div className="detail-max">
                    Max :{" "}
                    {Math.round(
                      geoWeatherData[currentIndex]?.forecast[0]?.wind?.max,
                      0
                    )}{" "}
                    {geoWeatherData[currentIndex]?.forecast[0]?.wind?.units}
                  </div>
                  <div className="detail-min">
                    Min :{" "}
                    {Math.round(
                      geoWeatherData[currentIndex]?.forecast[0]?.wind?.min,
                      0
                    )}{" "}
                    {geoWeatherData[currentIndex]?.forecast[0]?.wind?.units}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-soil-temp">
              <div className="w-title">
                <h5>Soil Temperature</h5>
              </div>
              <div className="w-details">
                {geoWeatherData[currentIndex]?.forecast[0]?.soilTemperatures?.map(
                  (soilTemp, index) => {
                    return (
                      <div className="soil-detail-container">
                        <div
                          key={guid() + index}
                          className="w-detail soil-depth"
                        >
                          {soilTemp.depth}{" "}
                        </div>
                        <div key={guid() + index} className="w-detail">
                          Max : {Math.round(soilTemp.max, 0)} °{soilTemp.units}
                        </div>
                        <div key={guid() + index} className="w-detail">
                          Min : {Math.round(soilTemp.min, 0)} °{soilTemp.units}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className="w-soil-moisture">
              <div className="w-title">
                <h5>Soil Moisture</h5>
              </div>
              <div className="w-details">
                {geoWeatherData[currentIndex]?.forecast[0]?.soilMoisture?.map(
                  (soilMoist, index) => {
                    return (
                      <div className="soil-detail-container">
                        <div
                          key={guid() + index}
                          className="w-detail soil-depth"
                        >
                          {soilMoist.depth}{" "}
                        </div>
                        <div key={guid() + index} className="w-detail">
                          Max : {Math.round(soilMoist.max, 0)} %
                        </div>
                        <div key={guid() + index} className="w-detail">
                          Min : {Math.round(soilMoist.min, 0)} %
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            {/* <div className="w-soil-details">
              <div className="w-title">
                <h5>Soil Details</h5>
              </div>
              <div className="w-details">
                <div className="w-detail">Texture: {soilsData.texture}</div>
                <div className="w-detail">Soil Type: {soilsData.soilType}</div>
                <div className="w-detail">
                  Max Available Water Holding Capacity: {soilsData.maxAWC}
                </div>
                <div className="w-detail">
                  Min Available Water Holding Capacity: {soilsData.minAWC}
                </div>
                <div className="w-detail">
                  Avg Available Water Holding Capacity: {soilsData.avgAWC}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      );
    } else {
      return (
        <div className="no-data">
          <h1>NO DATA</h1>
        </div>
      );
    }
  }
}
