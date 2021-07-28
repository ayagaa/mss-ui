import React, { Component } from 'react';

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

export default class ContactDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin02: [],
      admin03: [],
      admin1: null,
      admin2: null,
      admin3: null
    };
  }

  selectAdmin01(detail) {
    const { applicationValues, stepLabel, admins, handleChange } = this.props;
    const administrations = admins.admins;

    handleChange("countyId", detail);
    const admin2 = administrations.find(admin => admin.countyId === detail.target.value).subCounties;
    this.setState({
      admin02: admin2,
      admin1: detail.target.value
      //admin03: []
    });
  }

  selectAdmin02(detail) {
    const{handleChange} = this.props;
    const { admin02 } = this.state;

    handleChange("subCountyId", detail);
    const admin3 = admin02.find(admin => admin.subCountyId === detail.target.value).wards;
    this.setState({
      admin03: admin3,
      admin2: detail.target.value
    });
  }

  selectAdmin03(detail) {
    const{handleChange} = this.props;
    handleChange("wardId", detail);
    this.setState({
      admin3: detail.target.value
    });
  }

  render() {
    const { applicationValues, stepLabel, admins, values, handleChange } = this.props;
    const { admin02, admin03} = this.state;
    const administrations = admins.admins;
    const genderItems = ["Female", "Male", "Transgender"];
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
                    <option value={admin01.countyId} key={index}>{admin01.countyName}</option>
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
                    <option value={admin.subCountyId} key={index}>{admin.subCountyName}</option>
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
                    <option value={admin.wardId} key={index}>{admin.wardName}</option>
                  );
                })}
              </Select>
            </FormControl>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}
