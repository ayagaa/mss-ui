import React, { Component } from "react";

import {
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  CssBaseline,
  Container,
  Box,
  FormControl,
  FormHelperText,
  Button,
  Select,
  TextField,
} from "@material-ui/core";

export default class PersonalDetailsForm extends Component {
  render() {
    const {stepLabel, values, handleChange } = this.props;
    return (
      <React.Fragment>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Typography component="h1" variant="h5">
            {stepLabel}
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
                {/* <option value={1}>Aggregator</option> */}
                <option value={2}>AgroInput Supplier</option>
                {/* <option value={3}>Agro Processor</option> */}
                <option value={5}>Producer Groups</option>
                {/* <option value={6}>Technical Service Providers</option>
                <option value={7}>Trader</option> */}
              </Select>
            </FormControl>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}
