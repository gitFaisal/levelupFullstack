import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { login } from "./LoginStyles";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import InputAdornment from "@material-ui/core/InputAdornment";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";

const Login = (props) => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    hidePassword: true,
  });

  let history = useHistory();

  const handleChange = (name) => (e) => {
    setLoginInfo({
      ...loginInfo,
      [name]: e.target.value,
    });
  };

  const showPassword = () => {
    setLoginInfo({ hidePassword: !loginInfo.hidePassword });
  };

  const isValid = () => {
    if (loginInfo.email === "") {
      return false;
    } else if (loginInfo.password === "") {
      return false;
    }
    return true;
  };
  const loginHandler = (e) => {
    e.preventDefault();
    const userInfo = {
      email: loginInfo.email,
      password: loginInfo.password,
    };
    axios
      .post("/api/users/login", userInfo)
      .then((res) => {
        localStorage.setItem("user_id", res.data.user_id);
        props.userAuth(res.data);
        history.push("/");
        props.refreshHandler();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { classes } = props;

  return (
    <div className={classes.main}>
      <CssBaseline />

      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PeopleAltIcon className={classes.icon} />
        </Avatar>

        <form
          className={classes.form}
          onSubmit={loginHandler}
          // add on submit handler
        >
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
              onChange={handleChange("email")}
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
              onChange={handleChange("password")}
              type={loginInfo.hidePassword ? "password" : "input"}
              endAdornment={
                loginInfo.hidePassword ? (
                  <InputAdornment position="end">
                    <VisibilityOffTwoToneIcon
                      fontSize="default"
                      className={classes.passwordEye}
                      onClick={showPassword}
                    />
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end">
                    <VisibilityTwoToneIcon
                      fontSize="default"
                      className={classes.passwordEye}
                      onClick={showPassword}
                    />
                  </InputAdornment>
                )
              }
            />
          </FormControl>

          <Button
            disabled={!isValid()}
            disableRipple
            fullWidth
            variant="outlined"
            className={classes.button}
            type="submit"
            onClick={loginHandler}
          >
            Log In
          </Button>
          <Link to="/register">Don't have an account yet?</Link>
        </form>
      </Paper>
    </div>
  );
};

export default withStyles(login)(Login);
