import React, { Component } from "react";

import {
  FormControl,
  Button,
  Select,
  TextField,
  CssBaseline,
  Container,
} from "@material-ui/core";

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

let userPreferences = [];
let rowIndex = 0;

export default class ProducerGroupDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin02: [],
      admin03: [],
      admin1: null,
      admin2: null,
      admin3: null,
      selections: [],
      nationalId: null,
      phoneNumber: null,
      age: null,
      sex: null,
      dialogOpen: false,
    };
  }
  selectAdmin01(detail) {
    const { applicationValues, stepLabel, admins, handleChange } = this.props;
    const administrations = admins.admins;
    const admin2 = administrations.find(
      (admin) => admin.countyId === detail.target.value
    ).subCounties;
    const county = administrations.find(
      (admin) => admin.countyId === detail.target.value
    );
    handleChange("countyId", detail);
    handleChange("county", county);

    this.setState({
      admin02: admin2,
      admin1: detail.target.value,
      //admin03: []
    });
  }

  selectAdmin02(detail) {
    const { handleChange } = this.props;
    const { admin02 } = this.state;
    const admin3 = admin02.find(
      (admin) => admin.subCountyId === detail.target.value
    ).wards;
    const subCounty = admin02.find(
      (admin) => admin.subCountyId === detail.target.value
    );
    handleChange("subCountyId", detail);
    handleChange("subCounty", subCounty);
    this.setState({
      admin03: admin3,
      admin2: detail.target.value,
    });
  }

  selectAdmin03(detail) {
    const { handleChange } = this.props;
    const { admin03 } = this.state;
    const ward = admin03.find((admin) => admin.wardId === detail.target.value);
    handleChange("wardId", detail);
    handleChange("wardName", ward.wardName);
    this.setState({
      admin3: detail.target.value,
    });
  }

  showDialog = () => {
    this.setState({
      dialogOpen: true,
    });
    console.log("Here");
    //handleChange("buyerBV", null, lat, lon);
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  handleAdd = () => {
    const { handleChange, values } = this.props;
    const { nationalId, phoneNumber, age, sex } = this.state;

    rowIndex++;

    userPreferences.push({
      nationalId,
      phoneNumber,
      age,
      sex,
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

  selectNationalId(event) {
    this.setState({
      nationalId: event.target.value,
    });
  }

  selectPhoneNumber(event) {
    this.setState({
      phoneNumber: event.target.value,
    });
  }

  selectAge(event) {
    this.setState({
      age: event.target.value,
    });
  }

  selectSex(event) {
    this.setState({
      sex: event.target.value,
    });
  }

  loadDataGrid = (values) => {
    if (values?.buyerBV?.length > 0) {
      return (
        <div style={{ height: "100%", width: "100%" }}>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableCell width={150}>National Id</TableCell>
                <TableCell width={150}>Phone no</TableCell>
                <TableCell width={50}>Age</TableCell>
                <TableCell width={50}>Sex</TableCell>
                <TableCell width={10}></TableCell>
              </TableHead>
              <TableBody>
                {values?.buyerBV?.map((row, index) => (
                  <TableRow key={row.rowIndex}>
                    <TableCell>{row.nationalId}</TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.sex}</TableCell>
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
              <TableCell width={150}>National Id</TableCell>
              <TableCell width={150}>Phone no</TableCell>
              <TableCell width={50}>Age</TableCell>
              <TableCell width={50}>Sex</TableCell>
              <TableCell width={10}></TableCell>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  render() {
    const { applicationValues, stepLabel, admins, values, handleChange } =
      this.props;
    const { admin02, admin03, dialogOpen } = this.state;
    const administrations = admins.admins;
    const selectionTable = this.loadDataGrid(values);
    return (
      <React.Fragment>
        <div>
          <Dialog
            open={dialogOpen}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {values.labels.productPreference}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter details of farmers in this group
              </DialogContentText>
              <TextField
                disabled={values.submitted}
                label={values.labels.nationalId}
                type="number"
                onChange={(event) => this.selectNationalId(event)}
                // defaultValue={values.nationalId}
                variant="outlined"
              />
              <br />
              <br />
              <TextField
                disabled={values.submitted}
                label={values.labels.phoneNumber}
                onChange={(event) => this.selectPhoneNumber(event)}
                // defaultValue={values.contactNo}
                variant="outlined"
              />
              <br />
              <br />
              <TextField
                disabled={values.submitted}
                label="Age"
                type="number"
                onChange={(event) => this.selectAge(event)}
                // defaultValue={values.nationalId}
                variant="outlined"
              />
              <br />
              <br />
              <FormControl>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Gender
                </InputLabel>
                <Select
                  disabled={values.submitted}
                  autoFocus={false}
                  label={values.labels.gender}
                  // value={values.gender}
                  onChange={(event) => this.selectSex(event)}
                  inputProps={{
                    name: "gender",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option value={"Female"}>{values.labels.female}</option>
                  <option value={"Male"}>{values.labels.male}</option>
                  <option value={"Trans-gender"}>
                    {values.labels.transGender}
                  </option>
                </Select>
              </FormControl>
              <br />
              <br />
              {selectionTable}
              <br />
              <br />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Close
              </Button>
              <Button onClick={this.handleAdd} color="primary">
                Add Member
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Typography component="h1" variant="h5">
            Producer Group Details
          </Typography>
          <br />
          <TextField
            disabled={values.submitted}
            label="Group Name"
            onChange={(event) => handleChange("gender", event)}
            defaultValue={values.gender}
            variant="outlined"
          />
          <br />
          <br />
          {/* <FormControl>
              <InputLabel htmlFor="outlined-age-native-simple">
              {values.labels.userType}
              </InputLabel>
              <Select
                disabled={values.submitted}
                autoFocus={false}
                label="Group Type"
                // value={values.userType}
                // onChange={(event) => handleChange("userType", event)}
                inputProps={{
                  name: "userType",
                  id: "outlined-age-native-simple",
                }}
              >
                <option value={1}>Aggregator</option>
                <option value={2}>AgroInput Supplier</option>
                <option value={3}>Agro Processor</option>
                <option value={5}>Producer Groups</option>
                <option value={6}>Technical Service Providers</option>
                <option value={7}>Trader</option>
              </Select>
            </FormControl> */}
          {/* <br />
            <br /> */}
          <FormControl>
            <InputLabel htmlFor="outlined-age-native-simple">
              {values.labels.county}
            </InputLabel>
            <Select
              disabled={values.submitted}
              autoFocus={false}
              label={values.labels.county}
              onChange={(event) => handleChange("countyId", event)}
              inputProps={{
                name: "countyId",
                id: "outlined-age-native-simple",
              }}
              onChange={(event) => this.selectAdmin01(event)}
            >
              {administrations?.map((admin01, index) => {
                return (
                  <option value={admin01.countyId} key={index}>
                    {admin01.countyName}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl>
            <InputLabel htmlFor="outlined-age-native-simple">
              {values.labels.subCounty}
            </InputLabel>
            <Select
              disabled={values.submitted}
              autoFocus={false}
              label={values.labels.subCounty}
              inputProps={{
                name: "subCountyId",
                id: "outlined-age-native-simple",
              }}
              onChange={(event) => this.selectAdmin02(event)}
            >
              {admin02?.map((admin, index) => {
                return (
                  <option value={admin.subCountyId} key={index}>
                    {admin.subCountyName}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl>
            <InputLabel htmlFor="outlined-age-native-simple">
              {values.labels.ward}
            </InputLabel>
            <Select
              disabled={values.submitted}
              autoFocus={false}
              label="Ward"
              onChange={(event) => this.selectAdmin03(event)}
              inputProps={{
                name: "wardId",
                id: "outlined-age-native-simple",
              }}
            >
              {admin03?.map((admin, index) => {
                return (
                  <option value={admin.wardId} key={index}>
                    {admin.wardName}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          <TextField
            disabled={values.submitted}
            label="Village"
            onChange={(event) => handleChange("latitude", event)}
            defaultValue={values.latitude}
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            disabled={values.submitted}
            label="Primary Crop"
            onChange={(event) => handleChange("longitude", event)}
            defaultValue={values.longitude}
            variant="outlined"
          />
          <br />
          <FormControl variant="outlined">
            <div className="button-container">
              <br />
              <br />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                //style={styles.button}
                onClick={this.showDialog}
              >
                Add Group Members
              </Button>
            </div>
          </FormControl>
        </Container>
      </React.Fragment>
    );
  }
}
