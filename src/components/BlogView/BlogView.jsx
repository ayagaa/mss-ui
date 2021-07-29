import React, { Component } from "react";

import { FormControl, Button, Select, TextField } from "@material-ui/core";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from "@material-ui/core/InputLabel";

import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { addPost } from "../../store/epic/userDataEpic";
import { authenticateUser } from "../../store/epic/userAuthEpic";

import Post from "./Post";

import "./BlogView.css";
import "./../../styles/FormStyles.css";

export default class BlogView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
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
    };
  }

  componentDidMount() {
    if (window.store?.authUser && window.store?.authUser.length > 0) {
      console.log(window.store.authUser[0]?.authUser);
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
    return (
      <div style={{ height: "100%", width: "100%" }}>
        {posts.map((row, index) => (
          <Post post={row} />
        ))}
      </div>
    );
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  showDialog = () => {
    this.setState({
      dialogOpen: true,
    });
  };

  handleAdd = () => {
    const {postType, postTitle, postContent, user} = this.state;
    
    let postMaterial = {
      postId: null,
      userNo: user.userNo,
      post: postContent,
      postType: postType,
      postDate: null,
      userId: user.userId,
      title: postTitle
    };

    console.log(postMaterial);

    const [userData, userDataDispatch] = window.store.userData;

    addPost(postMaterial, userDataDispatch).then((result) => {
      const [authUser, authDispatch] = window.store.authUser;
      authenticateUser(user, authDispatch)
      .then((response) => {
        const [authUser] = window.store.authUser;
        if (authUser.authUser && authUser.authUser.user) {
          console.log(authUser);
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
  }

  handleChange = (input, event) => {
    if(input=== "type" && event.target.value){
      this.setState({
        postType: event.target.value
      });

    }
    if(input === "title" && event.target.value){
      this.setState({
        postTitle: event.target.value,
      });
    }
    if(input === "post" && event.target.value){
      this.setState({
        postContent: event.target.value,
      });
    }
  }

  render() {
    const {dialogOpen} = this.state;
    let postContainer = this.loadPosts();
    return (
      <React.Fragment>
        <div>
          <Dialog
            open={dialogOpen}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle style={{width: "500px"}} id="form-dialog-title">
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
              <TextareaAutosize style={{width: "450px"}} aria-label="minimum height" minRows={10} onChange={(event) => this.handleChange("post", event)} />
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
        <CssBaseline />

        <div className="menu-bar">
          <div className="logo-container"></div>
          <div className="title-container">
            <Typography component="h1" variant="h3">
              MSS Posts
            </Typography>
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
            <div className="post-list-container">
              {postContainer}
            </div>
          </Typography>
        </Container>
      </React.Fragment>
    );
  }
}
