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

import { addFarmer, addBuyer } from "../../store/epic/userDataEpic";

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

    if (values.userType === 1) {
      let farmerBvs = [];
      let farmerContacts = [];
      values.farmerBV.map((bv) => {
        farmerBvs.push({
          bvId: bv.bvId,
          farmerId: null,
          latitude: bv.latitude,
          longitude: bv.longitude,
          wardId: values.wardId,
        });
      });

      farmerContacts.push({
        contactNo: values.contactNo,
        emailAddress: values.emailAddress,
      });

      const farmerData = {
        farmer: {
          nationalId: values.nationalId,
          firstName: values.firstName,
          givenName: values.givenName,
          otherName: values.otherName,
          gender: values.gender,
          farmerBvs: farmerBvs,
          farmerContacts: farmerContacts,
        },
        userPassword: values.password,
      };

      const [userData, userDataDispatch] = window.store.userData;

      addFarmer(farmerData, userDataDispatch).then((result) => {
        const {values} = this.props;
        const [userData, userDataDispatch] = window.store.userData;
        if (userData && userData.farmerData) {
          if (
            userData.farmerData.errorMessage &&
            userData.farmerData.errorMessage?.length > 0
          ) {
            this.setState({
              isSuccessfull: false,
              userId: userData.farmerData.userId,
              message: (
                <div>
                  <p>
                    {values.labels.failureResult}
                  </p>
                  <br />
                  <h2>{userData.farmerData.errorMessage}</h2>
                </div>
              ),
            });
          } else if (userData.farmerData.errorMessage === null) {
            this.setState({
              isSuccessfull: true,
              userId: userData.farmerData.userId,
              message: (
                <div>
                  <p>
                  {values.labels.successResult}
                  </p>
                  <br />
                  <h2>{userData.farmerData.userId}</h2>
                </div>
              ),
            });
          }
        }
      });
    } else if (values.userType === 2) {
      let buyerContacts = [];
      let buyerPreferences = [];

      buyerContacts.push({
        contactNo: values.contactNo,
        emailAddress: values.emailAddress,
        latitude: values.latitude,
        longitude: values.longitude,
        wardId: values.wardId,
      });

      values.buyerBV.map((bv) => {
        buyerPreferences.push({
          bvId: bv.bvId,
          purchasePower: bv.purchasePower,
          um: bv.um,
        });
      });

      const buyerData = {
        buyer: {
          nationalId: values.nationalId,
          firstName: values.firstName,
          givenName: values.givenName,
          otherName: values.otherName,
          gender: values.gender,
          buyerContacts: buyerContacts,
          buyerPreferences: buyerPreferences,
        },
        userPassword: values.password,
      };

      const [userData, userDataDispatch] = window.store.userData;

      addBuyer(buyerData, userDataDispatch).then((result) => {
        const [userData, userDataDispatch] = window.store.userData;
        if (userData) {
          if (
            userData.buyerData.errorMessage &&
            userData.buyerData.errorMessage?.length > 0
          ) {
            this.setState({
              isSuccessfull: false,
              userId: userData.buyerData.userId,
              message: (
                <div>
                  <p>
                  {values.labels.failureResult}
                  </p>
                  <br />
                  <h2>{userData.buyerData.errorMessage}</h2>
                </div>
              ),
            });
          } else if (userData.buyerData.errorMessage === null) {
            this.setState({
              isSuccessfull: true,
              userId: userData.buyerData.userId,
              message: (
                <div>
                  <p>
                  {values.labels.successResult}
                  </p>
                  <br />
                  <h2>{userData.buyerData.userId}</h2>
                </div>
              ),
            });
          }
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
