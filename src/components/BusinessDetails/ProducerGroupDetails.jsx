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

export default class ProducerGroupDetails extends Component {
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
            Producer Group Details
          </Typography>
          <br />
          <form>
            <TextField
              disabled={values.submitted}
              label="Group Name"
            //   onChange={(event) => handleChange("firstName", event)}
            //   defaultValue={values.firstName}
              variant="outlined"
            />
            <br/>
            <br/>
            <FormControl>
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
            </FormControl>
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
            <br />
            <br />
            <TextField
              disabled={values.submitted}
              label="Village"
            //   onChange={(event) => handleChange("contactNo", event)}
            //   defaultValue={values.contactNo}
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              disabled={values.submitted}
              label="Primary Crop"
            //   onChange={(event) => handleChange("emailAddress", event)}
            //   defaultValue={values.emailAddress}
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
                onClick={this.nextStep}
              >
                Add Group Members
              </Button>
            </div>
          </FormControl>

          </form>
        </Container>
      </React.Fragment>
    )
  }
}
