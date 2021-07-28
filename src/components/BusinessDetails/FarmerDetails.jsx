import React, { Component } from "react";

import { FormControl, Button, Select, TextField } from "@material-ui/core";

import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { get03Map } from "../../store/epic/locationSearchEpic";

import AppMap from "../Map/AppMap";
import "./FarmerDetails.css";

let userPreferences = [];

export default class FarmerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      varieties: [],
      selections: [],
      valueChainId: "",
      valueChain: "",
      bvId: "",
      bvName: "",
      latitude: 0,
      longitude: 0,
      geoJson: [],
    };
  }

  componentWillMount() {
    const { values } = this.props;
    const [search, searchDispatch] = window.store.search;
    get03Map(
      values.countyId,
      values.subCountyId,
      values.wardName,
      searchDispatch
    ).then((result) => {
      const [search, searchDispatch] = window.store.search;
      if (searchDispatch?.map03GeoJson && search.map03GeoJson?.features) {
        this.setState({
          geoJson: search.map03GeoJson,
        });
      }
    });
  }

  componentDidMount() {
    const { values } = this.props;
    const [search, searchDispatch] = window.store.search;
    get03Map(
      values.countyId,
      values.subCountyId,
      values.wardName,
      searchDispatch
    ).then((result) => {
      const [search, searchDispatch] = window.store.search;
      this.setState({
        geoJson: search.map03GeoJson,
      });
    });
  }

  showDialog = (lat, lon) => {
    this.setState({
      dialogOpen: true,
      latitude: lat,
      longitude: lon,
    });
  };

  handleClose = (lat, lon) => {
    this.setState({
      dialogOpen: false,
    });
  };

  handleAdd = () => {
    const { handleChange, values } = this.props;
    const { valueChainId, valueChain, bvId, bvName, latitude, longitude} =
      this.state;

    userPreferences.push({
      valueChainId,
      valueChain,
      bvId,
      bvName,
      latitude,
      longitude,
    });

    this.setState({
      selections: userPreferences,
    });
    handleChange("farmerBV", userPreferences);
  };

  handleDelete = (event, rowIndex) => {
    const { handleChange } = this.props;
    const deleteObjIndex = userPreferences.findIndex((obj) => {
      return obj.rowIndex === rowIndex;
    });
    if (deleteObjIndex >= 0) {
      userPreferences.splice(deleteObjIndex, 1);
    }
    this.setState({
      selections: userPreferences,
    });
    handleChange("farmerBV", userPreferences);
  };

  selectValueChain(valueChain) {
    const { valueChains } = this.props;
    const valueChainList = valueChains?.valueChains;
    const varieties = valueChainList?.find(
      (v) => v.valueChainId === valueChain.target.value
    ).breedVarieties;
    var valueChainName = valueChainList?.find(
      (v) => v.valueChainId === valueChain.target.value
    ).valueChain;
    this.setState({
      varieties: varieties,
      valueChainId: valueChain.target.value,
      valueChain: valueChainName,
    });
  }

  selectVariety(variety) {
    const { varieties } = this.state;
    const bv = varieties?.find((v) => v.bvId === variety.target.value);
    this.setState({
      bvId: variety.target.value,
      bvName: bv.bvName,
    });
  }

  loadDataGrid = (values) => {
    if (values?.farmerBV?.length > 0) {
      return (
        <div style={{ height: "100%", width: "100%" }}>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableCell width={150}>{values.labels.valueChain}</TableCell>
                <TableCell width={150}>{values.labels.variety}</TableCell>
                <TableCell width={10}></TableCell>
              </TableHead>
              <TableBody>
                {values?.farmerBV?.map((row, index) => (
                  <TableRow key={row.rowIndex}>
                    <TableCell>{row.valueChain}</TableCell>
                    <TableCell>{row.bvName}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={(event) =>
                          this.handleDelete(event, row.rowIndex)
                        }
                      >
                        <DeleteIcon />
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
              <TableCell width={150}>{values.labels.valueChain}</TableCell>
              <TableCell width={150}>{values.labels.variety}</TableCell>
              <TableCell width={10}></TableCell>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  render() {
    const { values, stepLabel, valueChains } = this.props;
    const { dialogOpen, varieties, geoJson } = this.state;
    const selectionTable = this.loadDataGrid(values);
    return (
      <React.Fragment>
        <div>
          <Dialog
            open={dialogOpen}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">{values.labels.productPreference}</DialogTitle>
            <DialogContent>
              <DialogContentText>
              {values.labels.varietyPreferenceInstruction}
              </DialogContentText>
              <FormControl>
                <InputLabel htmlFor="outlined-age-native-simple">
                {values.labels.valueChain}
                </InputLabel>
                <Select
                  disabled={values.submitted}
                  autoFocus={false}
                  label={values.labels.valueChain}
                  onChange={(event) => this.selectValueChain(event)}
                >
                  {valueChains?.valueChains?.map((valueChain, index) => {
                    return (
                      <option value={valueChain.valueChainId} key={index}>
                        {valueChain.valueChain}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <br />
              <br />
              <FormControl>
                <InputLabel htmlFor="outlined-age-native-simple">
                {values.labels.variety}
                </InputLabel>
                <Select
                  disabled={values.submitted}
                  autoFocus={false}
                  label={values.labels.variety}
                  onChange={(event) => this.selectVariety(event)}
                >
                  {varieties.map((variety, index) => {
                    return (
                      <option value={variety.bvId} key={index}>
                        {variety.bvName}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <br />
              <br />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
              {values.labels.close}
              </Button>
              <Button onClick={this.handleAdd} color="primary">
              {values.labels.addProduct}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Typography component="h1" variant="h5">
          {stepLabel}
        </Typography>
        <br />
        <div className="farmer-details-container">
          <div className="instructions">
            <p>
              Please select from the map where your farms are located. Then you
              will be prompted to select what farming you practice in that
              location.
            </p>
          </div>
          <div className="table-container">{selectionTable}</div>
          <div className="farmer-map">
            <AppMap
              parentFunction={this.showDialog}
              resultDetails={geoJson}
              renderAdminMap={true}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
