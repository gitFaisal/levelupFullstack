const express = require("express");
const router = express.Router();

// Load skills model

const Skill = require("../../models/Skill");

router.post("/add-skill", (req, res) => {
  Skill.findOne({ text: req.body.text, user_id: req.body.user_id }).then(
    (skill) => {
      if (skill) {
        return res.status(400).json({ skill: "Already exists" });
      } else {
        const newSkill = new Skill({
          text: req.body.text,
          level: req.body.level,
          percent: req.body.percent,
          user_id: req.body.user_id,
        });
        // Save skill to collection
        newSkill
          .save()
          .then((skill) => res.json(skill))
          .catch((err) => console.log(err));
      }
    }
  );
});

router.get("/skills", async (req, res) => {
  var user_id = { user_id: req.query.user_id };
  try {
    var responseData = await Skill.find(user_id);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Skills were not found", message: err });
  }
  return res.json(responseData);
});

// change skills/:id
router.put("/update-skill", async (req, res) => {
  var id = req.body._id;
  var update = { level: req.body.level, percent: req.body.percent };
  try {
    var responseData = await Skill.findByIdAndUpdate(id, update, { new: true });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "skill was not updated", message: err });
  }

  return res.json({ response: "Successful", data: responseData });
});

router.delete("/skills/:id", async (req, res) => {
  var id = req.params.id;
  try {
    var responseData = await Skill.findByIdAndRemove(id);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "skill was not deleted", message: err });
  }

  return res.json({ response: "Successful", data: responseData });
});

module.exports = router;
