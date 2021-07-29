import React, { Component } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import { FormControl, FormHelperText, Button } from "@material-ui/core";

import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import PersonalDetailsForm from "../PersonalDetailsForm/PersonalDetailsForm";
import ContactDetailsForm from "../ContactDetailsForm/ContactDetailsForm";
import BuyerDetails from "../BusinessDetails/BuyerDetails";
import FarmerDetails from "../BusinessDetails/FarmerDetails";
import CredentialsForm from "../CredentialsForm/CredentialsForm";
import RegistrationResult from "../RegistrationResult/RegistrationResult";
import AggregatorDetails from "../BusinessDetails/AggregatorDetails";
import AgroInputSupplierDetails from "../BusinessDetails/AgroInputSupplierDetails";
import AgroProcessorDetails from "../BusinessDetails/AgroProcessorDetails";
// import FinanceServicesDetails from "../BusinessDetails/FinanceServicesDetails";
import ProducerGroupDetails from "../BusinessDetails/ProducerGroupDetails";
import TechnicalServiceProviderDetails from "../BusinessDetails/TechnicalServiceProviderDetails";
import TraderDetails from "../BusinessDetails/TraderDetails";
import { googleTranslate } from "../../utils/googleTranslate";

import { getAdmins } from "../../store/epic/adminsEpic";

import "./../../styles/FormStyles.css";

const styles = {
  button: {
    margin: 15,
  },
};

let administrationList = "";
let valueChainsList = "";
const resetLabels = {
  nationalId: "National ID",
  firstName: "First Name",
  givenName: "Given Name",
  otherName: "Other Name",
  gender: "Gender",
  female: "Female",
  male: "Male",
  transGender: "Trans-gender",
  userType: "User Type",
  farmer: "Farmer",
  trader: "Trader",
  valueChain: "Value Chain",
  variety: "Variety",
  purchasePower: "Purchase Power",
  productPreference: "Product preference",
  preferenceInstruction:
    " Please select the produce and the variety you prefer",
  varietyPreferenceInstruction:
    "Please select the produce and the variety you have on your farm(s).",
  unitofMeasure: "Unit of Measure",
  close: "Close",
  addProduct: "Add Product",
  selectMapInstructions: "Please select your location from the map.",
  selectFarmInstruction:
    "Please select from the map where your farms are located. Then you will be prompted to select what farming you practice in that location.",
  phoneNumber: "Phone Number",
  emailAddress: "Email Address",
  county: "County",
  subCounty: "Sub-county",
  ward: "Ward",
  passwordError: "Please ensure the passwords are the same",
  newPassword: "New Password",
  confirmPassword: "Confirm Password",
  failureResult: `The registration was not successfull. Please check the
  details you entered. There could be duplicate entries in
  national ID. The error is:`,
  successResult: `You have been successfully registered in the MIS service.
  Please login with username and password you entered. Your
  user name is:`,
  stepPersonalDetails: "Personal Details",
  stepContactDetails: "Contact Details",
  stepBusinessDetails: "Business Details",
  stepLoginDetails: "Login Details",
  stepConfirmation: "Confirmation",
  stepSignin: "Sign in",
  stepContentPersonalDetails: "Enter your personal details",
  stepContentContactDetails: "Enter your contact details",
  stepContentBusinessDetails1: "Your Farm(s) Details",
  stepContentBusinessDetails2: "Business details",
  stepContentPassword: "Please enter a password for your new account",
  stepContentConfirmation: "Confirmation",
  errorCheckMessage:
    "Please ensure that you have entered all the required fields",
  mainFormTitle: "MAMIS Service Registration Form",
  mainBackButton: "Back",
  mainSaveButton: "Save and continue",
};

export class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      nationalId: null,
      firstName: "",
      givenName: "",
      otherName: "",
      gender: "",
      contactNo: "",
      emailAddress: "",
      userType: null,
      latitude: null,
      longitude: null,
      countyId: null,
      subCountyId: null,
      wardId: null,
      wardName: "",
      buyerBV: [],
      farmerBV: [],
      userName: "",
      password: "",
      aggregator: null,
      agroinputSupplier: null,
      agroProcessor: null,
      producerGroup: null,
      technicalServiceProvider: null,
      trader: null,
      county: null,
      subCounty: null,
      // aggregator:{
      //   businessName: "",
      //   businessType: "",
      //   registrationStatus: "",
      //   employeeCount: 0,
      //   startYear: 0,
      //   aggregatorDetails: [],
      //   aggregatorCounties: []
      // },
      // agroinputSupplier:{
      //   businessName: "",
      //   registrationStatus: "",
      //   employeeCount: 0,
      //   startYear: 0,
      //   agroInputs: []
      // },
      // agroProcessor:{
      //   businessName: "",
      //   registrationStatus: "",
      //   employeeCount: 0,
      //   startYear: 0,
      //   agroProcessorsProducts:[]
      // },
      // producerGroup:{
      //   groupName: "",
      //   groupType: "",
      //   county: "",
      //   subCounty: "",
      //   ward: "",
      //   village: "",
      //   primaryCrop: "",
      //   producerGroupMembers: []
      // },
      // technicalServiceProvider:{
      //   institutionName: "",
      //   institutionType: "",
      //   employeeCount: 0,
      //   technicalServices:[]
      // },
      // trader:{
      //   businessName: "",
      //   registrationStatus:"",
      //   employeeCount: 0,
      //   startYear: 0,
      //   traderCounties: []
      // },
      submitted: false,
      hasError: false,
      errorText: "",
      checked: false,
      labels: {
        nationalId: "National ID",
        firstName: "First Name",
        givenName: "Given Name",
        otherName: "Other Name",
        gender: "Gender",
        female: "Female",
        male: "Male",
        transGender: "Trans-gender",
        userType: "Group Type",
        farmer: "Farmer",
        trader: "Trader",
        valueChain: "Value Chain",
        variety: "Variety",
        purchasePower: "Purchase Power",
        productPreference: "Product preference",
        preferenceInstruction:
          " Please select the produce and the variety you prefer",
        varietyPreferenceInstruction:
          "Please select the produce and the variety you have on your farm(s).",
        unitofMeasure: "Unit of Measure",
        close: "Close",
        addProduct: "Add Product",
        selectMapInstructions: "Please select your location from the map.",
        selectFarmInstruction:
          "Please select from the map where your farms are located. Then you will be prompted to select what farming you practice in that location.",
        phoneNumber: "Phone Number",
        emailAddress: "Email Address",
        county: "County",
        subCounty: "Sub-county",
        ward: "Ward",
        passwordError: "Please ensure the passwords are the same",
        newPassword: "New Password",
        confirmPassword: "Confirm Password",
        failureResult: `The registration was not successfull. Please check the
        details you entered. There could be duplicate entries in
        national ID. The error is:`,
        successResult: `You have been successfully registered in the MIS service.
        Please login with username and password you entered. Your
        user name is:`,
        stepPersonalDetails: "Personal Details",
        stepContactDetails: "Contact Details",
        stepBusinessDetails: "Business Details",
        stepLoginDetails: "Login Details",
        stepConfirmation: "Confirmation",
        stepSignin: "Sign in",
        stepContentPersonalDetails: "Enter your personal details",
        stepContentContactDetails: "Enter your contact details",
        stepContentBusinessDetails1: "Your Farm(s) Details",
        stepContentBusinessDetails2: "Business details",
        stepContentPassword: "Please enter a password for your new account",
        stepContentConfirmation: "Confirmation",
        errorCheckMessage:
          "Please ensure that you have entered all the required fields",
        mainFormTitle: "MSS Registration",
        mainBackButton: "Back",
        mainSaveButton: "Save and continue",
      },
    };
  }

  getTranslation = (word, startLang, targetLang, key, labelsList) => {
    let translationPromise = new Promise(() =>
      googleTranslate.translate(
        word,
        startLang,
        targetLang,
        function (err, translation) {
          let result = translation?.translatedText;
          labelsList[key] = result;
          return labelsList;
        }
      )
    );
  };

  componentDidMount() {
    const { labels, checked } = this.state;
    let changeLabels = labels;
    let tempLabels = labels;
    const [admins, adminsDispatch] = window.store.admins;
    const [valueChains, valueChainsDispatch] = window.store.valueChains;

    getAdmins(adminsDispatch).then((result) => {
      const [admins, adminsDispatch] = window.store.admins;
      administrationList = admins;
    });
  }

  getSteps = () => {
    const { labels } = this.state;
    return [
      labels.stepPersonalDetails,
      // labels.stepContactDetails,
      labels.stepBusinessDetails,
      labels.stepLoginDetails,
      labels.stepConfirmation,
      labels.stepSignin,
    ];
  };

  getStepContent = (step, userType) => {
    const { labels } = this.state;
    switch (step) {
      case 1:
        return labels.stepContentPersonalDetails;
      case 2:
        if (userType === 1) {
          return labels.stepContentBusinessDetails1;
        }
        return labels.stepContentBusinessDetails2;
      case 3:
        return labels.stepContentPassword;
      case 4:
        return labels.stepContentConfirmation;
    }
  };

  chechErrors() {
    const {
      step,
      nationalId,
      firstName,
      givenName,
      otherName,
      gender,
      contactNo,
      emailAddress,
      userType,
      latitude,
      longitude,
      countyId,
      subCountyId,
      wardId,
      wardName,
      buyerBV,
      farmerBV,
      userName,
      password,
      submitted,
      labels,
      aggregator,
      agroinputSupplier,
      agroProcessor,
      producerGroup,
      technicalServiceProvider,
      trader,
      county,
      subCounty
    } = this.state;

    let errorChecker = false;
    if (step === 1) {
      // errorChecker = !(
      //   firstName.length > 0 &&
      //   givenName.length > 0 &&
      //   userType > 0
      // );
    }
    if (step === 2) {
      // if (userType === 1) {
      //   errorChecker = !(aggregator?.businessName.length > 0 &&
      //     aggregator?.businessType.length > 0 && aggregator?.aggregatorDetails?.length > 0);
      // }
      // if (userType === 2) {
      //   errorChecker = !(agroinputSupplier.businessName.length > 0 && agroinputSupplier.agroInputs.length > 0);
      // }
      // if(userType === 3){
      //   errorChecker = !(agroProcessor.businessName.length > 0 && agroProcessor.agroProcessorsProducts.length > 0)
      // }
      // if(userType === 5){
      //   errorChecker = !(producerGroup.groupName.length > 0 && producerGroup.groupType.length > 0 && producerGroup.county.length > 0 &&
      //     producerGroup.subCounty.length > 0 && producerGroup.ward.length > 0 && producerGroup.village.length > 0 &&
      //     producerGroup.producerGroupMembers.length > 0)
      // }
      // if(userType === 6){
      //   errorChecker = !(technicalServiceProvider.institutionName.length > 0 && technicalServiceProvider.institutionType.length > 0 &&
      //     technicalServiceProvider.technicalServices.length > 0)
      // }
      // if(userType === 7){
      //   errorChecker = !(trader.businessName.length > 0 && trader.traderCounties.length > 0)
      // }
    }
    if (step === 4) {
      // errorChecker = !(password.length > 0);
    }


    return errorChecker;
  }

  nextStep = () => {
    const {
      step,
      nationalId,
      firstName,
      givenName,
      otherName,
      gender,
      contactNo,
      emailAddress,
      userType,
      latitude,
      longitude,
      countyId,
      subCountyId,
      wardId,
      wardName,
      buyerBV,
      farmerBV,
      userName,
      password,
      submitted,
      labels,
      aggregator,
      agroinputSupplier,
      agroProcessor,
      producerGroup,
      technicalServiceProvider,
      trader,
      county,
      subCounty
    } = this.state;

    if (step < 4) {
      let errorChecker = this.chechErrors();

      if (!errorChecker) {
        this.setState({
          step: step + 1,
          hasError: errorChecker,
          errorText: "",
        });
      } else {
        this.setState({
          hasError: errorChecker,
          errorText: labels.errorCheckMessage,
        });
      }
    } else {
      this.props.history.push("/");
    }

    const applicationDetails = {
      nationalId: nationalId,
      firstName: firstName,
      givenName: givenName,
      otherName: otherName,
      gender: gender,
      contactNo: contactNo,
      emailAddress: emailAddress,
      userType: userType,
      latitude: latitude,
      longitude: longitude,
      countyId: countyId,
      subCountyId: subCountyId,
      wardId: wardId,
      wardName: wardName,
      buyerBV: buyerBV,
      farmerBV: farmerBV,
      userName: userName,
      password: password,
      submitted: submitted,
      labels: labels,
      aggregator: aggregator,
      agroinputSupplier: agroinputSupplier,
      agroProcessor: agroProcessor,
      producerGroup: producerGroup,
      technicalServiceProvider: technicalServiceProvider,
      trader: trader,
      county: county,
      subCounty: subCounty
    };
  };

  previousStep = () => {
    const { step } = this.state;
    if (step > 1) {
      this.setState({
        step: step - 1,
      });
    }
  };

  getPage = (step, applicationValues, stepLabel, userType) => {
    switch (step) {
      case 1:
        return (
          <PersonalDetailsForm
            stepLabel={stepLabel}
            values={applicationValues}
            handleChange={this.handleChange}
          />
        );
      case 2:
        if (userType === 1) {
          return (
            <AggregatorDetails
              stepLabel={stepLabel}
              values={applicationValues}
              valueChains={valueChainsList}
              handleChange={this.handleChange}
            />
          );
        }else if(userType === 2){
          return (
            <AgroInputSupplierDetails
              stepLabel={stepLabel}
              values={applicationValues}
              valueChains={valueChainsList}
              handleChange={this.handleChange}
            />
          );
        }else if(userType === 3){
          return (
            <AgroProcessorDetails
              stepLabel={stepLabel}
              values={applicationValues}
              valueChains={valueChainsList}
              handleChange={this.handleChange}
            />
          );
        }else if(userType === 5){
          return (
            <ProducerGroupDetails
              stepLabel={stepLabel}
              values={applicationValues}
              admins={administrationList}
              valueChains={valueChainsList}
              handleChange={this.handleChange}
            />
          );
        }else if(userType === 6){
          return (
            <TechnicalServiceProviderDetails
              stepLabel={stepLabel}
              values={applicationValues}
              valueChains={valueChainsList}
              handleChange={this.handleChange}
            />
          );
        }else if(userType === 7){
          return (
            <TraderDetails
              stepLabel={stepLabel}
              values={applicationValues}
              valueChains={valueChainsList}
              handleChange={this.handleChange}
            />
          );
        }
      case 3:
        return (
          <CredentialsForm
            stepLabel={stepLabel}
            values={applicationValues}
            handleChange={this.handleChange}
          />
        );
      case 4:
        return (
          <RegistrationResult
            stepLabel={stepLabel}
            values={applicationValues}
            handleChange={this.handleChange}
          />
        );
    }
  };

  handleChange = (input, e, lat = null, lon = null) => {
    let inputValue = "";
    if (input === "buyerBV" && e === null) {
      // this.setState({
      //   latitude: lat,
      //   longitude: lon,
      // });
    } else if (input === "buyerBV" && e && e?.length >= 0) {
      this.setState({
        buyerBV: e,
      });
    } else if (input == "farmerBV" && e && e?.length >= 0) {
      this.setState({
        farmerBV: e,
      });
    } else if (
      input === "wardId" &&
      e.target &&
      e.target.value &&
      administrationList &&
      administrationList.admins.length > 0
    ) {
      const { countyId, subCountyId } = this.state;
      const county = administrationList.admins.find(
        (county) => county.countyId === countyId
      );

      const subCounty = county.subCounties.find(
        (subCounty) => subCounty.subCountyId === subCountyId
      );

      const ward = subCounty.wards.find((w) => w.wardId === e.target.value);
      this.setState({
        county: county.countyName,
        subCounty: subCounty.subCountyName,
        wardId: ward.wardId,
        wardName: ward.wardName,
      });
    } else if (e && e.target && e.target.value) {
      inputValue = e.target.value;
      this.setState({ [input]: inputValue });
    } else if (e && e.target && e.target.innerText) {
      inputValue = e.target.innerText;
      this.setState({ [input]: inputValue });
    }
  };

  render() {
    const steps = this.getSteps();


    const {
      step,
      nationalId,
      firstName,
      givenName,
      otherName,
      gender,
      contactNo,
      emailAddress,
      userType,
      latitude,
      longitude,
      countyId,
      subCountyId,
      wardId,
      wardName,
      buyerBV,
      farmerBV,
      userName,
      password,
      submitted,
      hasError,
      errorText,
      labels,
      aggregator,
      agroinputSupplier,
      agroProcessor,
      producerGroup,
      technicalServiceProvider,
      trader,
      county,
      subCounty
    } = this.state;


    const applicationValues = {
      nationalId,
      firstName,
      givenName,
      otherName,
      gender,
      contactNo,
      emailAddress,
      userType,
      latitude,
      longitude,
      countyId,
      subCountyId,
      wardId,
      wardName,
      buyerBV,
      farmerBV,
      userName,
      password,
      submitted,
      labels,
      aggregator,
      agroinputSupplier,
      agroProcessor,
      producerGroup,
      technicalServiceProvider,
      trader,
      county,
      subCounty
    };

    let stepLabel = this.getStepContent(step, userType);

    const currentPage = this.getPage(
      step,
      applicationValues,
      stepLabel,
      userType
    );

    const { checked } = this.state;

    return (
      <div>
        <div className="form-container">
          <div className="menu-bar">
            <div className="logo-container"></div>
            <div className="title-container">
              <Typography component="h1" variant="h3">
                {labels.mainFormTitle}
              </Typography>
            </div>
          </div>
          <div className="form-steps-large">
            <div className="steps-container">
              <Stepper activeStep={step - 1}>
                {steps.map((label, index) => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </div>
          </div>
          <div className="form-error">
            <FormControl error={hasError}>
              <FormHelperText hidden={!hasError} color="primary">
                {errorText}
              </FormHelperText>
            </FormControl>
          </div>
          <FormControl variant="outlined">
            <div className="form-body">{currentPage}</div>
            <div className="button-container">
              <br />
              <br />
              <Button
                variant="outlined"
                color="primary"
                disabled={step === 1}
                style={styles.backButton}
                onClick={this.previousStep}
              >
                {labels.mainBackButton}
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={styles.button}
                onClick={this.nextStep}
              >
                {labels.mainSaveButton}
              </Button>
            </div>
          </FormControl>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;
