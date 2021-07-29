import React, { Component } from "react";

import {
  Typography,
  CssBaseline,
  Container,
  Box,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { CheckCircle, Error } from "@material-ui/icons";

import { addFarmer, addBuyer, addGroup } from "../../store/epic/userDataEpic";

export default class RegistrationResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuccessfull: false,
      userId: "",
      message: "",
    };
  }

  componentDidMount() {
    const { values } = this.props;

    let userCreated = false;
    let groupCreated = false;
    let newUser;

    if (values.userType === 2) {

      let user = {
        userNo: null,
        userId: null,
        password: values.password,
        userType: 2,
        firstName: values.firstName,
        lastName: values.givenName,
        phone: values.contactNo,
        email: values.emailAddress
      };

      let agroInputs = [];

      values.farmerBV?.map((bv) => {
        agroInputs.push({
          businessId: null,
          supplyType: bv.supplyType,
          inputName: bv.inputName
        });
      });

      let inputSupplier = {
        businessId: null,
        businessName: values.wardName,
        registrationStatus: values.aggregator,
        employeeCount: values.agroProcessor,
        startYear: values.producerGroup,
        agroInputs: agroInputs
      };

      const [userData, userDataDispatch] = window.store.userData;

      addFarmer(user, userDataDispatch).then((result) => {
        const {values} = this.props;
        const [userData, userDataDispatch] = window.store.userData;
        console.log(userData);
        if (userData && userData.farmerData) {
          userCreated = true;
          newUser = userData.farmerData.user;
          this.setState({
            isSuccessfull: true,
            userId: newUser.userId,
            message: (
              <div>
                <p>
                {values.labels.successResult}
                </p>
                <br />
                <h2>{newUser.userId}</h2>
              </div>
            ),
          });
        }
      });
      
      addGroup(inputSupplier, values.userType, userDataDispatch).then((result) => {
        const {values} = this.props;
        const [userData, userDataDispatch] = window.store.userData;
        if (userData && userData.farmerData) {
          groupCreated = true;
        }
      });
    } else if (values.userType === 5) {

      let user = {
        userNo: null,
        userId: null,
        password: values.password,
        userType: 5,
        firstName: values.firstName,
        lastName: values.givenName,
        phone: values.contactNo,
        email: values.emailAddress
      };

      let groupMembers = [];

      values.buyerBV?.map((bv) => {
        groupMembers.push({
          memberId: null,
          groupId: null,
          nationalId: bv.nationalId,
          phoneNumber: bv.phoneNumber,
          age: bv.age,
          sex: bv.sex
        });
      });

      let producerGroup = {
        groupId: null,
        groupName: values.gender,
        groupType: "producer group",
        county: values.county,
        subCounty: values.subCounty,
        ward: values.wardName,
        village: values.latitude,
        primaryCrop: values.longitude,
        producerGroupMembers: groupMembers
      }

      const [userData, userDataDispatch] = window.store.userData;

      addFarmer(user, userDataDispatch).then((result) => {
        const {values} = this.props;
        const [userData, userDataDispatch] = window.store.userData;
        if (userData && userData.farmerData) {
          userCreated = true;
          newUser = userData.farmerData.user;
          this.setState({
            isSuccessfull: true,
            userId: newUser.userId,
            message: (
              <div>
                <p>
                {values.labels.successResult}
                </p>
                <br />
                <h2>{newUser.userId}</h2>
              </div>
            ),
          });
        }
      });

      addGroup(producerGroup, values.userType, userDataDispatch).then((result) => {
        const [userData, userDataDispatch] = window.store.userData;
        if (userData && userData.farmerData) {
          groupCreated = true;
        }
      });
    }
  }

  render() {
    const { stepLabel, values, handleChange } = this.props;
    const { isSuccessfull, message, userId } = this.state;
    return (
      <React.Fragment>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Typography component="h1" variant="h5">
            {stepLabel}
          </Typography>
          <Box>{message}</Box>
          <br />
          <br />
          <div hidden={!isSuccessfull}>
            <CheckCircle color="secondary" fontSize="large" />
          </div>
          <div hidden={isSuccessfull}>
            <Error color="primary" fontSize="large" />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
