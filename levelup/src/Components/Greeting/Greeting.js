import React from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Greeting.css";

const Greeting = () => {
  const styles = {
    margin: "auto",
    width: "75%",
    marginTop: "50px",
    padding: "20px",
    fontSize: "20px",
  };
  return (
    <div className="content1 bg-animate-blue">
      <h1 className="title">Welcome to the Level Up app!</h1>
      <Paper elevation={24} style={styles}>
        <Typography style={{ fontSize: "20px" }}>
          <h3>
            This is a productivity app, designed to help you keep track of where
            you are putting your time when it comes to leveling up a skill.
          </h3>
          <h4>
            Simply add skills and then level up by adding points to the skill
            each time an hour is spent towards that skill. Every 10 hours counts
            as a level.
          </h4>
          <h4>
            To get started either use the demo account info below or sign-up and
            starting leveling up your skills today!
          </h4>
          <h5>Demo username: demouser || Demo user password: demouser123</h5>
        </Typography>
      </Paper>

      <div className="btn-container">
        <Link to="/login">
          <Button
            variant="contained"
            style={{
              backgroundColor: "yellow",
              color: "purple",
              opacity: "0.7",
            }}
          >
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button variant="outlined" style={{ color: "yellow" }}>
            Register
          </Button>
        </Link>
        <Link to="/about">
          <Button
            variant="contained"
            style={{
              backgroundColor: "yellow",
              color: "purple",
              opacity: "0.7",
            }}
          >
            About
          </Button>
        </Link>
      </div>

      <div>
        <ul class="bubbles">
          <li>
            <span>+1</span>
          </li>
          <li>
            <span>+2</span>
          </li>
          <li>
            <span>+3</span>
          </li>
          <li>
            <span>+4</span>
          </li>
          <li>
            <span>+5</span>
          </li>
          <li>
            <span>+6</span>
          </li>
          <li>
            <span>+7</span>
          </li>
          <li>
            <span>+8</span>
          </li>
          <li>
            <span>+9</span>
          </li>
          <li>
            <span>+10</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Greeting;
