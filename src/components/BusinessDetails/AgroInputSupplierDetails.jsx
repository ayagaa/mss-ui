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

export default class AgroInputSupplierDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      businessName: "",
      registrationStatus: "",
      employeeCount: 0,
      startYear: 0,
      selections: [],
      supplyType: "",
      inputName: "",
    };
  }

  showDialog = () => {
    this.setState({
      dialogOpen: true,
    });
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

  handleClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  selectSupplyType(input) {
    console.log(input.target.value);
    this.setState({
      supplyType: input.target.value,
    });
  }

  enterInputName(input) {
    console.log(input.target.value);
    this.setState({
      inputName: input.target.value,
    });
  }

  handleAdd = () => {
    const { handleChange, values } = this.props;
    const { supplyType, inputName } = this.state;

    userPreferences.push({
      supplyType,
      inputName,
    });

    this.setState({
      selections: userPreferences,
    });
    handleChange("farmerBV", userPreferences);
  };

  loadDataGrid = (values) => {
    if (values?.farmerBV?.length > 0) {
      return (
        <div style={{ height: "100%", width: "100%" }}>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableCell width={150}>Supply Type</TableCell>
                <TableCell width={150}>Input Name</TableCell>
                <TableCell width={10}></TableCell>
              </TableHead>
              <TableBody>
                {values?.farmerBV?.map((row, index) => (
                  <TableRow key={row.rowIndex}>
                    <TableCell>{row.supplyType}</TableCell>
                    <TableCell>{row.inputName}</TableCell>
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
              <TableCell width={150}>Supply Type</TableCell>
              <TableCell width={150}>Input Name</TableCell>
              <TableCell width={10}></TableCell>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  render() {
    const { stepLabel, values, handleChange } = this.props;
    const { dialogOpen } = this.state;
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
                Please select and add the types of inputs supplied
              </DialogContentText>
              <FormControl>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Input type
                </InputLabel>
                <Select
                  // disabled={values.submitted}
                  autoFocus={false}
                  // label="Registration Status"
                  // value={values.aggregator}
                  onChange={(event) => this.selectSupplyType(event)}
                  inputProps={{
                    name: "userType",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option value={"Equipment"}>Equipment</option>
                  <option value={"Fertilizer"}>Fertilizer</option>
                </Select>
              </FormControl>
              <br />
              <br />
              <TextField
                disabled={values.submitted}
                label="Input Name"
                // type="number"
                onChange={(event) => this.enterInputName(event)}
                // defaultValue={values.agroProcessor}
                variant="outlined"
              />
              <br />
              <br />
              {selectionTable}
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
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Typography component="h1" variant="h5">
            Agro-Input Supplier Details
          </Typography>
          <br />
          <TextField
            disabled={values.submitted}
            label="Business Name"
            onChange={(event) => handleChange("wardName", event)}
            defaultValue={values.wardName}
            variant="outlined"
          />
          <br />
          <br />
          <FormControl>
            <InputLabel htmlFor="outlined-age-native-simple">
              Registration Status
            </InputLabel>
            <Select
              // disabled={values.submitted}
              autoFocus={false}
              label="Registration Status"
              value={values.aggregator}
              onChange={(event) => handleChange("aggregator", event)}
              inputProps={{
                name: "userType",
                id: "outlined-age-native-simple",
              }}
            >
              <option value={"Registered"}>Registered</option>
              <option value={"Not Registered"}>Not Registered</option>
            </Select>
          </FormControl>
          <br />
          <br />
          <TextField
            disabled={values.submitted}
            label="Number of Employees"
            type="number"
            onChange={(event) => handleChange("agroProcessor", event)}
            defaultValue={values.agroProcessor}
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            disabled={values.submitted}
            label="Start Year"
            type="number"
            onChange={(event) => handleChange("producerGroup", event)}
            defaultValue={values.producerGroup}
            variant="outlined"
          />
          <br />
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
                Add other details
              </Button>
            </div>
          </FormControl>
          <br />
          <br />
          <br />
          <br />
        </Container>
      </React.Fragment>
    );
  }
}
