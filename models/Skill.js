const mongoose = require('mongoose')

let Schema = mongoose.Schema;


const SkillSchema = new Schema({
    text: { 
        type: String, required:  true 
    },
    level: { 
        type: Number, required: true 
    },
    percent: { 
        type: Number, required: true 
    },
    user_id: {
        type: String, required: true
    }, 
    date: {
        type: Date, default: Date.now
    }
})



module.exports = Skill = mongoose.model('skills', SkillSchema);



