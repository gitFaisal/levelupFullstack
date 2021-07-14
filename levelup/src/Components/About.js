import React from "react";
import { Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import "../App.css";

const About = () => {
  const styles = {
    margin: "auto",
    width: "75%",
    marginTop: "50px",
    padding: "20px",
    fontSize: "20px",
  };
  return (
    <div>
      <Paper elevation={24} style={styles}>
        <Typography style={{ fontSize: "20px" }}>
          <h1>About the Level Up App</h1>
          <p>
            The idea for this app came from my personal level up chart on a
            white board. I was learning Python, SQL, JavaScript, Django, React,
            HTML, CSS, and AWS at the same time, and at some point I realized I
            had to come up with a way to visually remind myself of where I was
            putting my time.
          </p>

          <p>
            So I created a chart on my white board and wrote down names of the
            skills I was trying to level up. Every time I would spend an hours
            worth of studying/practice, I would give myself a point. Eventually
            when I had too many points in a particular skill I leveled it up and
            started the bar from empty.
          </p>
          <p>
            This method is simple and really helped me to see where I was
            putting my time and where I wasn't! I wanted to share my method with
            other people that were learning new skills, so I decided to make
            this level up app.
          </p>
          <p>
            If you have any questions or would like to reach me, please use the
            LinkedIn option in the side bar!
          </p>
        </Typography>
      </Paper>
      <Paper elevation={24} style={styles}>
        <Typography style={{ fontSize: "20px" }}>
          <h1>How to use!</h1>
          <p>
            This app is not limited to just tech skills. You can add any skills
            you want to get better at and then each time you spend an hour
            towards a skill, give yourself a point by hitting the plus button.
          </p>
          <p>
            You'll notice each + click gives you 10% towards leveling up. If you
            add too much by mistake, simply use the - button to correct the
            error.
          </p>
          <p>
            Your skills will be saved to your account, so you can come back any
            time to add more points!
          </p>
          <p>
            Example use cases: Physical fittness, varying classes taken during a
            semester, various subjects of a particular class, subjects needed to
            be worked on for a certification, tech skills, or pretty much
            anything you can think of that you will be putting time towards in
            order to improve yourself!
          </p>
        </Typography>
      </Paper>
    </div>
  );
};

export default About;
