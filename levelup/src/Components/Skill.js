import  React  from "react";
import Button from "react-bootstrap/Button";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Paper } from "@material-ui/core";
import "../App.css";

const Skill = ({ text, level, skill, percent, setSession, session }) => {
  const levelUpHandler = () => {
    let data = { _id: skill._id, level: skill.level, percent: skill.percent };

    if (data.percent == 90) {
      data.percent = 0;
      data.level += 1;
    } else {
      data.percent += 10;
    }
    const updateSkill = async () => {
      try {
        const response = await axios.put("/api/users/update-skill", data);
      } catch (error) {
        console.log("Something went wrong:", error);
      }
    };
    updateSkill();
    setSession({ ...session, refresh: !session.refresh });
  };

  const levelDownHandler = () => {
    let data = { _id: skill._id, level: skill.level, percent: skill.percent };

    if (data.percent == 0 && data.level > 1) {
      data.level -= 1;
      data.percent = 90;
    } else if (data.percent != 0 && data.skill != 1) {
      data.percent -= 10;
    }
    const updateSkill = async () => {
      try {
        const response = await axios.put("/api/users/update-skill", data);
      } catch (error) {
        console.log("Something went wrong: ", error);
      }
    };
    updateSkill();
    setSession({ ...session, refresh: !session.refresh });
  };

  const deleteHandler = () => {
    const deleteSkill = async () => {
      try {
        const response = await axios.delete(`/api/users/skills/${skill._id}`);
      } catch (error) {
        console.log("Something went wrong: ", error);
      }
    };
    deleteSkill();
    setSession({ ...session, refresh: !session.refresh });
  };

  return (
    <div className="paper-wrap">
      <Paper elevation={3} style={{ borderRadius: "50px" }}>
        <div className="skill">
          <Button
            onClick={levelDownHandler}
            className="bar-btn"
            style={{ borderRadius: "25px" }}
          >
            <i className="fas fa-minus"></i>
          </Button>
          <div>
            <div className="saved-skill">{text}</div>

            <div className="progressBar">
              <ProgressBar
                now={percent}
                label={`${percent}%`}
                style={{ borderRadius: "35px" }}
              />
            </div>
          </div>
          <div className="level-num">{level}</div>
          <Button
            onClick={levelUpHandler}
            className="bar-btn"
            style={{ borderRadius: "25px" }}
          >
            <i className="fas fa-plus"></i>
          </Button>
          <Button
            onClick={deleteHandler}
            className="bar-btn"
            style={{ backgroundColor: "red", borderRadius: "25px" }}
          >
            <i className="fas fa-trash"></i>
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Skill;
