import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "./Post.css";

export default class Post extends Component {
  render() {
    const {post} = this.props;
    return (
      <div className="post-container">
        <div className="post-header">
          <div className="post-type">
            <Chip color="primary" label="Post Type" />
          </div>
          <div className="post-auther">
            <div className="user-icon">
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </div>
            <div className="user-id">
              <Typography component="h5" variant="h7">
                {post?.userId}
              </Typography>
            </div>
          </div>
        </div>
        <div className="post-body">
          <div className="post-title">
          <Typography component="h1" variant="h6">
            {post?.title}
          </Typography>
          </div>
          <div className="post-message">
            <p>{post?.post}</p>
          </div>
          <div className="post-date">
            <span>Post Date: {post?.postDate}</span>
          </div>
        </div>
      </div>
    );
  }
}
