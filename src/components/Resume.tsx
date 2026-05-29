import { Avatar, Checkbox, Fieldset, ProgressBar, Tab, Tabs } from '@react95/core';
import profile from '../assets/profile.png';

function Resume() {
  return (
    <Tabs defaultActiveTab="Intro">
      <Tab title="Intro">
        <h3>hey im jonathan</h3>
        <Avatar src={profile} alt="A portrait of the jon" size="140px" />

        <p>a self learnt designer and programmer always seeking to grow</p>
      </Tab>
      <Tab title="Education">
        <Fieldset legend="Muthoot Institute of Technology and Science, Kochi, India (2025 - 2029)">
          <Checkbox readOnly checked>
           Bachelors of Technology in Computer Science and Engineering
          </Checkbox>
        </Fieldset>
        <Fieldset legend="Primus Public School, Bengaluru, India (2023 - 2025)">
          <Checkbox readOnly checked>
            Karnataka State Board of Pre-University Education, Science Stream
          </Checkbox>
          <Checkbox readOnly checked>
            Achieved Distinction grade in PCM+cs+French subject combination 
          </Checkbox>
        </Fieldset>
        <Fieldset legend="Bethany High School, Bengaluru, India (2010 - 2023)">
          <Checkbox readOnly checked>
            Indian Certificate of Secondary Education (ICSE) Board
          </Checkbox>
        </Fieldset>
      </Tab>
      <Tab title="Experience">
        <Fieldset legend="MITS Polaris Game Labs (2026 - Present)">
          <Checkbox readOnly checked>
           Design Lead
          </Checkbox>
        </Fieldset>
        <Fieldset legend="Innovation and Entrepreneurship Development Centre MITS (2026 - Present)">
          <Checkbox readOnly checked>
            Design Subcomittee Member
          </Checkbox>
        </Fieldset>
        <Fieldset legend="MITS Media Club (2025 - Present)">
          <Checkbox readOnly checked>
           Design Subcomitee Member
          </Checkbox>
          <Checkbox readOnly checked>
           Designed Posters and ID cards for MITS 2026 Tech Fest, Shreshta
          </Checkbox>
     </Fieldset>
     <Fieldset legend="MUNwala (2023 - 2024)">
          <Checkbox readOnly checked>
           Design Intern
          </Checkbox><br></br>
          <Checkbox readOnly checked>
           Designed stories and posts related to Model United Nations and MUNwala events
          </Checkbox>
          <Checkbox readOnly checked>
           Handled Onboarding process for MUNwala Delegations
          </Checkbox>
     </Fieldset>
      </Tab>
      <Tab title="My Stats">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <Fieldset legend="Core Languages">
            <ul>
              <li className="resume-skills">Python</li>
              <ProgressBar percent={98} width="200px" />
              <li className="resume-skills">Java</li>
              <ProgressBar percent={85} width="200px" />
              <li className="resume-skills">C++</li>
              <ProgressBar percent={80} width="200px" />
              <li className="resume-skills">C</li>
              <ProgressBar percent={80} width="200px" />
              <li className="resume-skills">Javascript</li>
              <ProgressBar percent={75} width="200px" />
              <li className="resume-skills">React</li>
              <ProgressBar percent={70} width="200px" />
            </ul>
          </Fieldset>
          <Fieldset legend="Design">
            <ul>
              <li className="resume-skills">Figma</li>
              <ProgressBar percent={100} width="200px" />
              <li className="resume-skills">Adobe Photoshop</li>
              <ProgressBar percent={92} width="200px" />
              <li className="resume-skills">Adobe Illustrator</li>
              <ProgressBar percent={94} width="200px" />
              <li className="resume-skills">Gimp</li>
              <ProgressBar percent={85} width="200px" />
            </ul>
          </Fieldset>
          <Fieldset legend="Frameworks and Tools">
            <ul>
              <li className="resume-skills">SQL</li>
              <ProgressBar percent={99} width="200px" />
              <li className="resume-skills">Flask</li>
              <ProgressBar percent={88} width="200px" />
              <li className="resume-skills">Django</li>
              <ProgressBar percent={75} width="200px" />
            </ul>
          </Fieldset>
        </div>
      </Tab>
      <Tab title="The Soul of the Engineer">
        <Fieldset legend="Core Attributes">
          <p>
            I am a relentless problem-solver, a collaborative spirit, and a lifelong learner. My passion for technology is matched only by my dedication to creating meaningful and impactful digital experiences. I thrive in dynamic environments where I can push the boundaries of what's possible and contribute to a team that shares my vision for a better, more connected world.
          </p>
        </Fieldset>
      </Tab>
    </Tabs>
  );
}

export default Resume;