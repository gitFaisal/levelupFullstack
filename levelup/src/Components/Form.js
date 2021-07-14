import React from "react";
import Button from "react-bootstrap/Button";
import { TextField } from "@material-ui/core";
import axios from "axios";

function Form({ refreshHandler, inputText, setInputText, session }) {
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };
  // Possibly refactor submit handler using async await for consistency with other handlers
  const submitHandler = (e) => {
    e.preventDefault();
    const newSkill = {
      text: inputText,
      level: 1,
      percent: 0,
      user_id: session.user_id,
    };
    if (inputText != "") {
      axios.post("/api/users/add-skill", newSkill).then((res) => {
        console.log("Response Data:", res.data);
        refreshHandler();
      });
    }
    setInputText("");
  };

  return (
    <div className="input-form">
      <div className="input-field">
        <TextField
          className="input-field"
          placeholder="Enter New Skill"
          onChange={inputTextHandler}
          type="text"
          inputProps={{
            min: 0,
            style: { textAlign: "center", fontSize: "30px", color: "white" },
          }}
        />
        <Button
          onClick={submitHandler}
          variant="primary"
          type="submit"
          style={{ borderRadius: "25px" }}
        >
          <i className="fas fa-plus"></i>
        </Button>
      </div>
    </div>
  );
}

export default Form;
