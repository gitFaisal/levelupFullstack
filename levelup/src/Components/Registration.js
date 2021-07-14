import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { register } from "./RegistrationStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import validator from "validator";

class Registration extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    hidePassword: true,
    error: null,
    errorOpen: false,
    redirect: false,
  };

  errorClose = (e) => {
    this.setState({
      errorOpen: false,
    });
  };

  handleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  passwordMatch = () => this.state.password === this.state.password2;

  showPassword = () => {
    this.setState((prevState) => ({ hidePassword: !prevState.hidePassword }));
  };

  isValid = () => {
    if (this.state.email === "") {
      return false;
    } else if (!validator.isEmail(this.state.email)) {
      return false;
    }
    return true;
  };
  submitRegistration = (e) => {
    e.preventDefault();
    if (!this.passwordMatch()) {
      this.setState({
        errorOpen: true,
        error: "Passwords don't match",
      });
    }
    if (!this.isValid()) {
      this.setState({
        errorOpen: true,
        error: "The Email you entered is not valid",
      });
    }

    const newUserCredentials = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    // console.log("this.props.newUserCredentials", newUserCredentials);
    axios
      .post("/api/users/register", newUserCredentials)
      .then((res) => {
        this.setState({ redirect: true });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert("The email you used already exist!");
      });
  };

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <div className={classes.main}>
        <CssBaseline />

        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PeopleAltIcon className={classes.icon} />
          </Avatar>
          <form
            className={classes.form}
            onSubmit={() => this.submitRegistration}
          >
            {" "}
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="name" className={classes.labels}>
                name
              </InputLabel>
              <Input
                name="name"
                type="name"
                autoComplete="name"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("name")}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="email" className={classes.labels}>
                e-mail
              </InputLabel>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("email")}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="password" className={classes.labels}>
                password
              </InputLabel>
              <Input
                name="password"
                autoComplete="password"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("password")}
                type={this.state.hidePassword ? "password" : "input"}
                endAdornment={
                  this.state.hidePassword ? (
                    <InputAdornment position="end">
                      <VisibilityOffTwoToneIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityTwoToneIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="password2" className={classes.labels}>
                confrim password
              </InputLabel>
              <Input
                name="password2"
                autoComplete="password2"
                className={classes.inputs}
                disableUnderline={true}
                onClick={this.state.showPassword}
                onChange={this.handleChange("password2")}
                type={this.state.hidePassword ? "password" : "input"}
                endAdornment={
                  this.state.hidePassword ? (
                    <InputAdornment position="end">
                      <VisibilityOffTwoToneIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityTwoToneIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>
            <Button
              disabled={!this.isValid()}
              disableRipple
              fullWidth
              variant="outlined"
              className={classes.button}
              type="submit"
              onClick={this.submitRegistration}
            >
              Sign Up
            </Button>
            <Link to="login">Already have an account?</Link>
          </form>

          {this.state.error ? (
            <Snackbar
              variant="error"
              key={this.state.error}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              open={this.state.errorOpen}
              onClose={this.errorClose}
              autoHideDuration={3000}
            >
              <SnackbarContent
                className={classes.error}
                message={
                  <div>
                    <span style={{ marginRight: "8px" }}>
                      <ErrorIcon fontSize="large" color="error" />
                    </span>
                    <span> {this.state.error} </span>
                  </div>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="close"
                    onClick={this.errorClose}
                  >
                    <CloseIcon color="error" />
                  </IconButton>,
                ]}
              />
            </Snackbar>
          ) : null}
        </Paper>
      </div>
    );
  }
}

export default withStyles(register)(Registration);
