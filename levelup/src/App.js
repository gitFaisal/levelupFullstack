import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import Navbar from "./Components/Navbar";
import SkillsList from "./Components/SkillsList";
import Logins from "./Components/Logins";
import About from "./Components/About";
import About2 from "./Components/About/About2";
import Registration from "./Components/Registration";
import Greeting from "./Components/Greeting/Greeting";
import logo from "./images/yellow_levelup.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";

function App() {
  // Get Token from local storage -- Need to figure out how to use JWT token for user session
  // const initialToken = localStorage.getItem('token');
  // Using user_id in localStorage to keep user loggedd in
  const initialUser = localStorage.getItem("user_id");
  // States
  const [inputText, setInputText] = useState("");
  const [skills, setSkills] = useState([]);
  const [session, setSession] = useState({
    auth: false,
    token: "",
    user_id: initialUser,
    refresh: false,
  });

  // Considering using object deconstruction
  var refresh = session.refresh;
  var isLoggedIn = session.user_id ? true : false;

  // call-back function for Logins component - Updates session and refresh invokes useEffect to run
  const userAuth = (data) => {
    setSession({
      auth: true,
      token: data.token,
      user_id: data.user_id,
      refresh: !session.refresh,
    });
    console.log("User logged in successfully!");
  };

  // Resets session state to default, removes user_id from localStorage
  const logoutHandler = () => {
    if (isLoggedIn) {
      setSession({ auth: false, token: "", user_id: "" });
      localStorage.removeItem("user_id");
    }
  };

  const refreshHandler = () => {
    setSession({ ...session, refresh: !session.refresh });
  };

  useEffect(() => {
    if (session.user_id) {
      setSession({ ...session, auth: true });
    }
    const fetchSkills = async () => {
      try {
        const response = await axios.get(
          `/api/users/skills?user_id=${initialUser}`
        );
        console.log(response.data);
        setSkills(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSkills();
  }, [refresh]);

  return (
    <Router>
      <div className="App">
        <Navbar logoutHandler={logoutHandler} session={session} />

        <Switch>
          {isLoggedIn && (
            <Route path="/" exact>
              <div className="app-container">
                <img id="logo" src={logo} alt="LEVEL UP!" />

                <Form
                  inputText={inputText}
                  setInputText={setInputText}
                  skills={skills}
                  setSkills={setSkills}
                  session={session}
                  setSession={setSession}
                  refreshHandler={refreshHandler}
                />
                <br />
                <SkillsList
                  isLoggedIn={isLoggedIn}
                  skills={skills}
                  setSkills={setSkills}
                  session={session}
                  setSession={setSession}
                  refreshHandler={refreshHandler}
                />
              </div>
            </Route>
          )}
          {!isLoggedIn && (
            <Route path="/" exact>
              <Greeting />
            </Route>
          )}
          <Route path="/register" component={Registration} />
          <Route path="/login">
            <Logins userAuth={userAuth} />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
