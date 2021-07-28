import React, { Component } from 'react';

import { FormControl, Button, Select, TextField, CssBaseline, Container } from "@material-ui/core";

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

export default class FinanceServicesDetails extends Component {
  render() {
    const {stepLabel, values, handleChange } = this.props;
    return (
        <React.Fragment>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Typography component="h1" variant="h5">
            Finance Services Details
          </Typography>
          <br />
          <form>
            <TextField
              disabled={values.submitted}
              label={values.labels.firstName}
              onChange={(event) => handleChange("firstName", event)}
              defaultValue={values.firstName}
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              disabled={values.submitted}
              label="Last Name"
              onChange={(event) => handleChange("givenName", event)}
              defaultValue={values.givenName}
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              disabled={values.submitted}
              label={values.labels.phoneNumber}
              onChange={(event) => handleChange("contactNo", event)}
              defaultValue={values.contactNo}
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              disabled={values.submitted}
              label={values.labels.emailAddress}
              onChange={(event) => handleChange("emailAddress", event)}
              defaultValue={values.emailAddress}
              variant="outlined"
            />
            <br />
            <br />
            <br />
            <br />
            <FormControl>
              <InputLabel htmlFor="outlined-age-native-simple">
              {values.labels.userType}
              </InputLabel>
              <Select
                disabled={values.submitted}
                autoFocus={false}
                label={values.labels.userType}
                value={values.userType}
                onChange={(event) => handleChange("userType", event)}
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
            </FormControl>
          </form>
        </Container>
      </React.Fragment>
    )
  }
}
