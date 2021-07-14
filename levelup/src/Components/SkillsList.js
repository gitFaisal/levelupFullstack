import React from 'react';
import Skill from './Skill';

// Component takes the skill components and maps them.
const SkillsList = ( { skills, setSkills, session, setSession } ) => {


    return (
    
        <div className='skills-container'> 
           
            <div className='skills-list'>
                {skills.map( skill => (
                    <Skill 
                        key={skill._id}
                        text={skill.text}
                        level={skill.level}
                        percent={skill.percent}
                        skills={skills}
                        skill={skill}
                        setSkills={setSkills}
                        setSession={setSession}
                        session={session}
                    />
                

                ))}
            </div>
        </div>
    );
};






export default SkillsList;
