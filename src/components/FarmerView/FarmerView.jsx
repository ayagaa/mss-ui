import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

import AppMap from "../Map/AppMap";
import WeatherContainer from "../WeatherDisplay/WeatherContainer";
import MarketInformation from "../MarketInformation/MarketInformation";

import { authenticateUser } from "../../store/epic/userAuthEpic";
import { getAdmins } from "../../store/epic/adminsEpic";
import { getWeatherData } from "../../store/epic/locationSearchEpic";

import "./FarmerView.css";

let weatherDetails = <div></div>;
let bVs = [];

let bVsCorrection = [];
let bVsCorrectionIndex = 0;

export default class FarmerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      user: 0,
      farmerData: null,
      mapData: null,
      markets: null,
      marketPrices: null,
      valueChains: null,
      isInitiated: false,
      rerenderMap: true,
      admins: null,
    };
  }

  componentDidMount() {
    const { isInitiated, mapData } = this.state;

    const [admins, adminsDispatch] = window.store.admins;
    getAdmins(adminsDispatch).then((result) => {
      const [admins, adminsDispatch] = window.store.admins;
      let administrationList = admins;
      this.setState({
        admins: administrationList.admins,
      });
    });

    if (window.store.authUser[0].authUser && !isInitiated) {
      this.setState({
        user: window.store.authUser[0].authUser.user,
        farmerData: window.store.authUser[0].authUser.farmer,
        mapData: window.store.authUser[0].authUser.mapData,
        markets: window.store.authUser[0].authUser.markets,
        marketPrices: window.store.authUser[0].authUser.marketPrices,
        valueChains: window.store.authUser[0].authUser.valueChains,
        wards: window.store.authUser[0].authUser.wards,
        searchResult: window.store.authUser[0].authUser.searchResult,
        isInitiated: true,
      });
    }
  }

  getPoint = (lat, lon) => {
    const [locationData, locationDataDispatch] = window.store.search;
    const latitude = lat;
    const longitude = lon;
    getWeatherData(latitude, longitude, locationDataDispatch).then((result) => {
      const [locationData, locationDataDispatch] = window.store.search;
      if (locationData) {
        console.log(locationData);
        this.setState({
          searchResult: locationData.weatherData,
        });
      }
    });
  };

  getWeatherData(event, rowIndex) {
    if (bVsCorrection && bVsCorrection.length > 0 && bVsCorrection[rowIndex]) {
      const [locationData, locationDataDispatch] = window.store.search;
      const latitude = bVsCorrection[rowIndex].lat;
      const longitude = bVsCorrection[rowIndex].lon;
      getWeatherData(latitude, longitude, locationDataDispatch).then(
        (result) => {
          const [locationData, locationDataDispatch] = window.store.search;
          if (locationData) {
            console.log(locationData);
            this.setState({
              searchResult: locationData.weatherData,
            });
          }
        }
      );
    }
  }

  renderWeatherData(currentData, forecastData, locationData) {
    return (
      <div className="weather-data">
        <WeatherContainer
          locationData={locationData}
          currentData={currentData}
          forecastData={forecastData}
        />
      </div>
    );
  }

  loadDataFarmerGrid = (farmer, valueChains) => {
    const { isInitiated } = this.state;

    if (farmer?.farmerBvs?.length > 0) {
      let valueChainId = 0;
      let valueChain = "";
      let bvId = 0;
      let bvName = "";
      let lat = 0;
      let lon = 0;
      let ward = "";
      let rowIndex = 1;
      bVs = [];

      for (let i = 0; i < farmer.farmerBvs.length; i++) {
        rowIndex++;
        valueChainId = 0;
        valueChain = "";
        bvId = 0;
        bvName = "";
        lat = 0;
        lon = 0;
        for (let j = 0; j < valueChains.length; j++) {
          bvId = farmer.farmerBvs[i]?.bvId;
          lat = farmer.farmerBvs[i]?.latitude;
          lon = farmer.farmerBvs[i]?.longitude;

          if (bvId && bvId !== 0) {
            valueChainId = valueChains[j]?.breedVarieties?.find(
              (bv) => bv.bvId === bvId
            )?.valueChainId;
            bvName = valueChains[j]?.breedVarieties?.find(
              (bv) => bv.bvId === bvId
            )?.bvName;
            valueChain = valueChains?.find(
              (v) => v.valueChainId === valueChainId
            )?.valueChain;
            bVs.push({
              valueChainId,
              valueChain,
              bvId,
              bvName,
              lat,
              lon,
              rowIndex,
            });
          }
        }
      }

      if (bVs && bVs.length > 0) {
        bVsCorrection = [];
        for (let i = 0; i < bVs.length; i++) {
          if (bVs[i].bvName && bVs[i].bvName.length > 0) {
            bVsCorrectionIndex++;
            bVsCorrection.push({
              valueChainId: bVs[i].valueChainId,
              valueChain: bVs[i].valueChain,
              bvId: bVs[i].bvId,
              bvName: bVs[i].bvName,
              lat: bVs[i].lat,
              lon: bVs[i].lon,
              rowIndex: bVs[i].rowIndex,
            });
          }
        }
      }

      return (
        <div style={{ height: "100%", width: "100%" }}>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableCell width={50}>Site</TableCell>
                <TableCell width={150}>Value Chain</TableCell>
                <TableCell width={150}>Variety</TableCell>
                <TableCell width={10}>Search</TableCell>
              </TableHead>
              <TableBody>
                {bVsCorrection?.map((row, index) => (
                  <TableRow key={row.rowIndex}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.valueChain}</TableCell>
                    <TableCell>{row.bvName}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={(event) => this.getWeatherData(event, index)}
                      >
                        <SearchIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableCell width={50}>Site</TableCell>
              <TableCell width={150}>Value Chain</TableCell>
              <TableCell width={150}>Variety</TableCell>
              <TableCell width={10}>Search</TableCell>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  handleChange = (event) => {
    if (event.target.innerText === "WEATHER INFORMATION") {
      this.setState({
        value: 0,
      });
    } else if (event.target.innerText === "MARKET INFORMATION") {
      this.setState({
        value: 1,
        rerenderMap: false,
      });
    } else if (event.target.innerText === "CREDIT FACILITIES") {
      this.setState({
        value: 2,
        rerenderMap: false,
      });
    } else if (event.target.innerText === "CROP INSURANCE") {
      this.setState({
        value: 3,
        rerenderMap: false,
      });
    }
  };

  renderTabContent(value) {
    const {
      mapData,
      rerenderMap,
      farmerData,
      markets,
      marketPrices,
      valueChains,
      searchResult,
      admins,
    } = this.state;

    const locationData = {
      location: searchResult?.region5,
      region1: searchResult?.region1,
      region3: searchResult?.region3,
    };
    const renderFarmerGrid = this.loadDataFarmerGrid(farmerData, valueChains);
    if (searchResult?.currentData && searchResult?.forecasts) {
      weatherDetails = this.renderWeatherData(
        searchResult.currentData,
        searchResult.forecasts?.forecasts,
        locationData
      );
    }
    switch (value) {
      case 0:
        return (
          <div className="weather-info-container">
            <div className="farm-data">{renderFarmerGrid}</div>
            <div className="map-container">
              <AppMap
                parentFunction={this.getPoint}
                resultDetails={mapData}
                renderAdminMap={rerenderMap}
              />
            </div>
            <div className="weather-data">{weatherDetails}</div>
          </div>
        );
      case 1:
        return (
          <div className="market-info-container">
            <MarketInformation
              marketPrices={marketPrices}
              markets={markets}
              valueChains={valueChains}
              admins={admins}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h1>Three</h1>
          </div>
        );
      case 3:
        return (
          <div>
            <h1>Four</h1>
          </div>
        );
      default:
        return (
          <div>
            <h1>One</h1>
          </div>
        );
    }
  }

  logout = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  render() {
    const { value, marketPrices, user } = this.state;
    const currentTab = this.renderTabContent(value);
    return (
      <div>
        <AppBar position="static" color="transparent">
          <Typography component="h1" variant="h3">
            MAMIS Service Farmer Page
          </Typography>
          <br />
          <br />
          <br />
          <Paper square>
            <Tabs
              value={value}
              onChange={(event) => this.handleChange(event)}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="primary"
              aria-label="icon label tabs example"
            >
              <Tab id={0} label="Weather Information" />
              <Tab id={1} label="Market Information" />
              <Tab id={2} label="Credit Facilities" />
              <Tab id={3} label="Crop Insurance" />
            </Tabs>
          </Paper>
          <div className="logout-button">
            <IconButton
              color="primary"
              aria-label="Logout"
              size="large"
              onClick={this.logout}
            >
              <PowerSettingsNewIcon />
            </IconButton>
            <a href="" onClick={this.logout}>
              Logout
            </a>
          </div>
        </AppBar>
        {currentTab}
      </div>
    );
  }
}
