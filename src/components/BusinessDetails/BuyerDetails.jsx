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
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { get03Map } from "../../store/epic/locationSearchEpic";

import AppMap from "../Map/AppMap";
import "./BuyerDetails.css";

let userPreferences = [];
const ums = ["90kg Bags", "50kg Bags"];
let rowIndex = 0;

export default class BuyerDetails extends Component {
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
      purchasePower: 0,
      um: "",
      latitude: 0,
      longitude: 0,
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
    const { handleChange} = this.props;
    this.setState({
      dialogOpen: true,
      latitude: lat,
      longitude: lon,
    });
    handleChange("buyerBV", null, lat, lon);
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  handleAdd = () => {
    const { handleChange, values } = this.props;
    const {
      valueChainId,
      valueChain,
      bvId,
      bvName,
      purchasePower,
      um,
    } = this.state;

    rowIndex++;

    userPreferences.push({
      valueChainId,
      valueChain,
      bvId,
      bvName,
      purchasePower,
      um,
      rowIndex,
    });

    // let valueChainSelect = document.getElementById("valueChainSelect");
    // let varietySelect = document.getElementById("varietySelect");
    // let umSelect = document.getElementById("umSelect");
    let purchasePowerInput = document.getElementById("purchasePowerInput");

    // valueChainSelect.innerText = "";
    // varietySelect.innerText = "";
    // umSelect.innerText = "";
    // purchasePowerInput.value = 0;
    this.setState({
      selections: userPreferences,
    });
    handleChange("buyerBV", userPreferences, values.latitude, values.longitude);
  };

  handleDelete = (event, rowIndex) => {
    const { handleChange, values } = this.props;
    const deleteObjIndex = userPreferences.findIndex((obj) => {
      return obj.rowIndex === rowIndex;
    });

    if (deleteObjIndex >= 0){
      userPreferences.splice(deleteObjIndex, 1);
    } 
    this.setState({
      selections: userPreferences,
    });
    handleChange("buyerBV", userPreferences, values.latitude, values.longitude);
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

  selectUM(event) {
    this.setState({
      um: event.target.value,
    });
  }

  selectPurchasePower(event) {
    this.setState({
      purchasePower: event.target.value,
    });
  }

  loadDataGrid = (values) => {
    if (values?.buyerBV?.length > 0) {
      return (
        <div style={{ height: "100%", width: "100%" }}>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableCell width={120}>{values.labels.valueChain}</TableCell>
                <TableCell width={130}>{values.labels.variety}</TableCell>
                <TableCell width={40}>{values.labels.unitofMeasure}</TableCell>
                <TableCell width={20}>{values.labels.purchasePower}</TableCell>
                <TableCell width={10}></TableCell>
              </TableHead>
              <TableBody>
                {values?.buyerBV?.map((row, index) => (
                  <TableRow key={row.rowIndex}>
                    <TableCell>{row.valueChain}</TableCell>
                    <TableCell>{row.bvName}</TableCell>
                    <TableCell>{row.um}</TableCell>
                    <TableCell>{row.purchasePower}</TableCell>
                    <TableCell>
                      <IconButton
                        id={row.rowIndex}
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
              <TableCell width={120}>{values.labels.valueChain}</TableCell>
              <TableCell width={130}>{values.labels.variety}</TableCell>
              <TableCell width={40}>{values.labels.unitofMeasure}</TableCell>
              <TableCell width={20}>{values.labels.purchasePower}</TableCell>
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
              {values.labels.preferenceInstruction}
              </DialogContentText>
              <FormControl>
                <InputLabel htmlFor="outlined-age-native-simple">
                {values.labels.valueChain}
                </InputLabel>
                <Select
                  id="valueChainSelect"
                  disabled={values.submitted}
                  autoFocus={false}
                  label="Value Chain"
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
                  id="varietySelect"
                  disabled={values.submitted}
                  autoFocus={false}
                  label={values.labels.varieties}
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
              <FormControl>
                <InputLabel htmlFor="outlined-age-native-simple">
                {values.labels.unitofMeasure}
                </InputLabel>
                <Select
                  id="umSelect"
                  disabled={values.submitted}
                  autoFocus={false}
                  label={values.labels.unitofMeasure}
                  onChange={(event) => this.selectUM(event)}
                >
                  {ums.map((um, index) => {
                    return (
                      <option value={um} key={index}>
                        {um}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <br />
              <br />
              <TextField
                id="purchasePowerInput"
                disabled={values.submitted}
                label={values.labels.purchasePower}
                type="number"
                onChange={(event) => this.selectPurchasePower(event)}
                variant="outlined"
              />
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
        <div className="buyer-details-container">
          <div className="instructions">
            <p>{values.labels.selectMapInstructions}</p>
          </div>
          <div className="table-container">{selectionTable}</div>
          <div className="buyer-map">
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
