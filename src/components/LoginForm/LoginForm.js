import React, {useState} from "react";
import { useHistory, useLocation } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


import { authenticateUser } from "../../store/epic/userAuthEpic";
import { getAdmins } from "../../store/epic/adminsEpic";


import { googleTranslate } from "../../utils/googleTranslate";

import "./LoginForm.css";


import "../../styles/FormStyles.css";

const initialFormData = Object.freeze({
  userEmail: "",
  userPassword: "",
});

const initViewData = Object.freeze({
  title:"Siaya Multi-Stakeholder Structures App",
  loginFormTitle:  "Sign in",
  loginButton: "Sign in",
  signUpText: "Don't have an account? Sign Up",
  userId: "User ID",
  password: "Password",
  
});


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        mss-ui
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginForm(props) {
  let history = useHistory();
  let location = useLocation();
  const classes = useStyles();

  const [viewData, translateFormData] = useState(initViewData);
  const [formData, updateFormData] = useState(initialFormData);
  const [checked, setChecked] = useState(false);

  let { from } = location.state || { from: { pathname: "/" } };

  const toggleChecked = () => {
    setChecked((prev) => !prev);
    if(!checked){
      window.language = "sw";
      let title = null;
      let loginFormTitle = null;
      let loginButton = null;
      let signUpText = null;
      let userIdLabel = null;
      let passwordLabel = null;

      let titlePromise = new Promise(() => googleTranslate.translate(viewData.title, "en", window.language, function(err, translation){
        title = translation.translatedText;
        translateFormData(({
          title:title,
          loginFormTitle:  loginFormTitle,
          loginButton: loginButton,
          signUpText: signUpText,
          userId: userIdLabel,
          password: passwordLabel
        }));
      }));

      let loginFormTitlePromise = new Promise(() =>  googleTranslate.translate(viewData.loginFormTitle, "en", window.language, function(err, translation){
        loginFormTitle = translation.translatedText;
        translateFormData(({
          title:title,
          loginFormTitle:  loginFormTitle,
          loginButton: loginButton,
          signUpText: signUpText,
          userId: userIdLabel,
          password: passwordLabel
        }));
      }));

      let loginButtonPromise = new Promise(() => googleTranslate.translate(viewData.loginButton, "en",window.language, function(err, translation){
        loginButton = translation.translatedText;
        translateFormData(({
          title:title,
          loginFormTitle:  loginFormTitle,
          loginButton: loginButton,
          signUpText: signUpText,
          userId: userIdLabel,
          password: passwordLabel
        }));
      }));

      let signUpTextPromise = new Promise(() => googleTranslate.translate(viewData.signUpText, "en",window.language, function(err, translation){
        signUpText = translation.translatedText;
        translateFormData(({
          title:title,
          loginFormTitle:  loginFormTitle,
          loginButton: loginButton,
          signUpText: signUpText,
          userId: userIdLabel,
          password: passwordLabel
        }));
      }));

      let userIdTextPromise = new Promise(() => googleTranslate.translate(viewData.userId, "en", window.language, function(err, translation){
        userIdLabel = translation.translatedText;
        translateFormData(({
          title:title,
          loginFormTitle:  loginFormTitle,
          loginButton: loginButton,
          signUpText: signUpText,
          userId: userIdLabel,
          password: passwordLabel
        }));
      }));

      let passwordLabelPromise = new Promise(() => googleTranslate.translate(viewData.password, "en", window.language, function(err, translation){
        passwordLabel = translation.translatedText;
        translateFormData(({
          title:title,
          loginFormTitle:  loginFormTitle,
          loginButton: loginButton,
          signUpText: signUpText,
          userId: userIdLabel,
          password: passwordLabel
        }));
      }));

    }else{
      window.language = "en";
      translateFormData(({
        title:"Machakos Agricultural Market Information System",
        loginFormTitle:  "Sign in",
        loginButton: "Sign in",
        signUpText: "Don't have ana account? Sign Up",
        userId: "User ID",
        password: "Password"
      }));
    }
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const [authUser, authDispatch] = window.store.authUser;
    const loginDetails = {
      userNo: '',
      userId: formData.userEmail,
      password: formData.userPassword,
      userType: 0,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      errorMessage: ''
    }
   
    authenticateUser(loginDetails, authDispatch)
      .then((response) => {
        const [authUser] = window.store.authUser;
        if (authUser.authUser && authUser.authUser.user) {
          console.log(authUser);
          if (authUser.authUser.user?.userType !== 0) {
            console.log(authUser.authUser);
            history.push("/posts");
          } else if (authUser.authUser.user?.userType === 0) {
            history.push("/posts");
          } else if (authUser.authUser.user?.userType === 2) {
            history.push("/posts");
          }
        }
      });
  };

  const register = (e) => {
    history.push("/registration-form", {
      state: {
        step: 1,
        nationalId: null,
        firstName: "",
        givenName: "",
        otherName: "",
        gender: "",
        contactNo: "",
        emailAddress: "",
        userType: "",
        buyerLatitude: null,
        buyerLongitude: null,
        buyerWardId: null,
        buyerBvId: null,
        buyerPurchasePower: 0.0,
        buyerUM: "",
        farmerBV: [],
      }
    });
  };

  const submit = (e) => {
    e.preventDefault();
    history.push("/application-form");
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/* <div className="cdf-image"></div> */}
          <Typography component="h1" variant="h7">
            {viewData.title}
          </Typography>
          <div className="login-container">
            <Typography component="h1" variant="h5">
              {viewData.loginFormTitle}
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="userEmail"
                label={viewData.userId}
                name="userEmail"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="userPassword"
                label={viewData.password}
                type="password"
                id="userPassword"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {viewData.loginButton}
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2" onClick={register}>
                    {viewData.signUpText}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>

        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>

  );
}

export default LoginForm;
