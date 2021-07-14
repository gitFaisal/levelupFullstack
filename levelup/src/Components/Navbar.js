import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import RightDrawer from "./RightDrawer";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar({ logoutHandler, session }) {
  const classes = useStyles();
  const isLoggedIn = session.auth;
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "yellow", opacity: "0.7" }}
      >
        <Toolbar>
          <Link to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
            >
              <HomeIcon iconStyle={{ height: "25px", width: "25px" }} />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            {/* Removed some text from here */}
          </Typography>
          {isLoggedIn && <RightDrawer logoutHandler={logoutHandler} />}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
