import React, { Component } from "react";

import { FormControl, Button, Select, TextField } from "@material-ui/core";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InputLabel from "@material-ui/core/InputLabel";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import DeleteIcon from "@material-ui/icons/Delete";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { addPost, addPostTarget } from "../../store/epic/userDataEpic";
import { authenticateUser } from "../../store/epic/userAuthEpic";

import Post from "./Post";

import "./BlogView.css";
import "./../../styles/FormStyles.css";

export default class BlogView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      dialogOpen: false,
      dialogShareOpen: false,
      aggregators: [],
      agroInputSuppliers: [],
      fgdgroups: [],
      financeServices: [],
      postTargets: [],
      posts: [],
      producerGroups: [],
      technicalServiceProviders: [],
      traders: [],
      user: [],
      users: [],
      postTitle: "Nothing",
      postType: "Nothing",
      postContent: "Nothing",
      targetPostId: 0,
      targetPostGroup: 0
    };
  }

  componentDidMount() {
    if (window.store?.authUser && window.store?.authUser.length > 0) {

      this.setState({
        agroInputSuppliers:
          window.store.authUser[0]?.authUser.agroInputSuppliers,
        postTargets: window.store.authUser[0]?.authUser.postTargets,
        posts: window.store.authUser[0]?.authUser.posts,
        producerGroups: window.store.authUser[0]?.authUser.producerGroups,
        user: window.store.authUser[0]?.authUser.user,
        users: window.store.authUser[0]?.authUser.users,
      });
    }
  }

  loadPosts = () => {
    const { posts, postTargets, user } = this.state;

    let targetPosts = [];

    if(user?.userType !== 0){
      posts?.map((p) => {
        if(p.userId === user.userId){
          targetPosts.push(p);
        }
      });
  
      for(let i = 0; i < postTargets?.length; i++){
        if(postTargets[i]?.postTargetGroup?.toString() === user?.userType?.toString()){
          let tp = posts.find(p => p.postId === postTargets[i].postId);
          if(tp){
            targetPosts.push(tp);
          }
        }
      }
    }else{
      posts?.map((p) => {
        targetPosts.push(p);
      });
    }

    return (
      <div style={{ height: "100%", width: "100%" }}>
        {targetPosts?.map((row, index) => (
          <Post post={row} showShareDialog={this.showShareDialog} userType={user.userType} />
        ))}
      </div>
    );
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  handleShareClose = () => {
    this.setState({
      dialogShareOpen: false,
    });
  };

  logout = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  showDialog = () => {
    this.setState({
      dialogOpen: true,
    });
  };

  showShareDialog = (targetPostId) => {
    this.setState({
      targetPostId: targetPostId,
      dialogShareOpen: true,
    });
  };

  selectShareGroup = (event) => {
    if(event?.target?.value){
      this.setState({
        targetPostGroup: event.target.value,
      });
    }
  }

  handleAdd = () => {
    const { postType, postTitle, postContent, user } = this.state;

    let postMaterial = {
      postId: null,
      userNo: user.userNo,
      post: postContent,
      postType: postType,
      postDate: null,
      userId: user.userId,
      title: postTitle,
    };

    const [userData, userDataDispatch] = window.store.userData;

    addPost(postMaterial, userDataDispatch).then((result) => {
      const [authUser, authDispatch] = window.store.authUser;
      authenticateUser(user, authDispatch).then((response) => {
        const [authUser] = window.store.authUser;
        if (authUser.authUser && authUser.authUser.user) {

          this.setState({
            dialogOpen: false,
            agroInputSuppliers:
              window.store.authUser[0]?.authUser.agroInputSuppliers,
            postTargets: window.store.authUser[0]?.authUser.postTargets,
            posts: window.store.authUser[0]?.authUser.posts,
            producerGroups: window.store.authUser[0]?.authUser.producerGroups,
            user: window.store.authUser[0]?.authUser.user,
            users: window.store.authUser[0]?.authUser.users,
          });
        }
      });
    });
  };

  handleShareAdd = () => {
    const {targetPostId, targetPostGroup, user} = this.state;

    let target = {
      id: null,
      postId: targetPostId,
      postTargetGroup: targetPostGroup,
    }

    const [userData, userDataDispatch] = window.store.userData;

    addPostTarget(target, userDataDispatch).then((result) => {
      const [authUser, authDispatch] = window.store.authUser;
      authenticateUser(user, authDispatch).then((response) => {
        const [authUser] = window.store.authUser;
        if (authUser.authUser && authUser.authUser.user) {

          this.setState({
            dialogShareOpen: false,
            agroInputSuppliers:
              window.store.authUser[0]?.authUser.agroInputSuppliers,
            postTargets: window.store.authUser[0]?.authUser.postTargets,
            posts: window.store.authUser[0]?.authUser.posts,
            producerGroups: window.store.authUser[0]?.authUser.producerGroups,
            user: window.store.authUser[0]?.authUser.user,
            users: window.store.authUser[0]?.authUser.users,
          });
        }
      });
    });
  }

  handleChange = (input, event) => {
    if (input === "type" && event.target.value) {
      this.setState({
        postType: event.target.value,
      });
    }
    if (input === "title" && event.target.value) {
      this.setState({
        postTitle: event.target.value,
      });
    }
    if (input === "post" && event.target.value) {
      this.setState({
        postContent: event.target.value,
      });
    }
  };

  changeTab = (event) => {
    if (event.target.innerText === "MSS USERS") {
      this.setState({
        value: 1,
      });
    } else if (event.target.innerText === "MSS POSTS") {
      this.setState({
        value: 0,
      });
    }
  };

  getUserType = (typeId) => {
    switch (typeId) {
      case 0:
        return "Administrator";
      case 1:
        return "Aggregator";
      case 2:
        return "Agro-Input Supplier";
      case 3:
        return "Agro Processors";
      case 4:
        return "Finance Services";
      case 5:
        return "Producer Group";
      case 6:
        return "Technical Service Provider";
      case 7:
        return "Traders";
    }
  };

  renderTab = () => {
    const { dialogOpen, value, users, dialogShareOpen } = this.state;
    switch (value) {
      case 0:
        let postContainer = this.loadPosts();
        return (
          <React.Fragment>
            <div>
              <Dialog
                open={dialogOpen}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle style={{ width: "500px" }} id="form-dialog-title">
                  New Post
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>Enter your post details</DialogContentText>
                  <FormControl>
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Post Type
                    </InputLabel>
                    <Select
                      // disabled={values.submitted}
                      autoFocus={false}
                      label="Post Type"
                      onChange={(event) => this.handleChange("type", event)}
                      inputProps={{
                        name: "userType",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option value={"Warning"}>Warning</option>
                      <option value={"Advisory"}>Advisory</option>
                      <option value={"Information"}>Information</option>
                      <option value={"Inquiry"}>Inquiry</option>
                    </Select>
                  </FormControl>
                  <br />
                  <br />
                  <TextField
                    label="Post Title"
                    onChange={(event) => this.handleChange("title", event)}
                    variant="outlined"
                  />
                  <br />
                  <br />
                  <TextareaAutosize
                    style={{ width: "450px" }}
                    aria-label="minimum height"
                    minRows={10}
                    onChange={(event) => this.handleChange("post", event)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Close
                  </Button>
                  <Button onClick={this.handleAdd} color="primary">
                    Post
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div>
              <Dialog
                open={dialogShareOpen}
                onClose={this.handleShareClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle style={{ width: "500px" }} id="form-dialog-title">
                  Share Post
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>Select group type to share with</DialogContentText>
                  <FormControl>
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Group Type
                    </InputLabel>
                    <Select
                      // disabled={values.submitted}
                      autoFocus={false}
                      label="Group Type"
                      onChange={(event) => this.selectShareGroup(event)}
                      inputProps={{
                        name: "userType",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option value={1}>Aggregators</option>
                      <option value={2}>Agro-Input Suppliers</option>
                      <option value={3}>Agro Processors</option>
                      <option value={4}>Finance Services</option>
                      <option value={5}>Producer Groups</option>
                      <option value={6}>Technical Service Providers</option>
                      <option value={7}>Traders</option>
                    </Select>
                  </FormControl>
                  <br />
                  <br />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleShareClose} color="primary">
                    Close
                  </Button>
                  <Button onClick={this.handleShareAdd} color="primary">
                    Post
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <CssBaseline />

            <div className="tab-menu-bar">
              <div className="tab-title-container">
                <Button onClick={this.showDialog} color="primary">
                  Add Post
                </Button>
              </div>
            </div>
            <Container maxWidth="md">
              <Typography
                component="div"
                style={{ backgroundColor: "#F9F9F9", height: "100%" }}
              >
                <div className="post-list-container">{postContainer}</div>
              </Typography>
            </Container>
          </React.Fragment>
        );
      case 1:
        return (
          <div style={{ height: "100%", width: "100%" }}>
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableCell width={50}>UserId</TableCell>
                  <TableCell width={150}>User Type</TableCell>
                  <TableCell width={150}>First Name</TableCell>
                  <TableCell width={150}>Last Name</TableCell>
                  <TableCell width={150}>Phone</TableCell>
                  <TableCell width={150}>Email</TableCell>
                </TableHead>
                <TableBody>
                  {users?.map((row, index) => (
                    <TableRow key={row.rowIndex}>
                      <TableCell>{row.userId}</TableCell>
                      <TableCell>{this.getUserType(row.userType)}</TableCell>
                      <TableCell>{row.firstName}</TableCell>
                      <TableCell>{row.lastName}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      {/* <TableCell>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={(event) => this.getWeatherData(event, index)}
                        >
                          <SearchIcon />
                        </IconButton>
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );
    }
  };

  render() {
    const { value } = this.state;
    const currentTab = this.renderTab(value);
    return (
      <div>
        <AppBar position="static" color="transparent">
          <Typography component="h1" variant="h3">
            Multi-Stakeholder Structures Interaction
          </Typography>
          <Paper square>
            <Tabs
              value={value}
              onChange={(event) => this.changeTab(event)}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="primary"
              aria-label="icon label tabs example"
            >
              <Tab id={0} label="MSS POSTS"/>
              <Tab id={1} label="MSS USERS" />
            </Tabs>
          </Paper>
          <div className="logout-button">
            <IconButton
              color="primary"
              aria-label="Logout"
              size="large"
              onClick={this.logout}
            >
              <PowerSettingsNewIcon />
            </IconButton>
            <a href="" onClick={this.logout}>
              Logout
            </a>
          </div>
        </AppBar>
        {currentTab}
      </div>
    );
  }
}
