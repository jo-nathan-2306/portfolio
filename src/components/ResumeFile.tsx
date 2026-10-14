import { useState } from "react";
import { Rnd } from "react-rnd";

function ResumeFile() {
  const [loaded, setLoaded] = useState(false);
  const [popupOpen, setPopupOpen] = useState(true);

  return (
    <div className="resume-file-viewer">
      <iframe
        title="Resume PDF"
        src="/resume.pdf#toolbar=0&navpanes=0&pagemode=none&view=FitH"
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <div className="pixel-loading-screen resume-loading-screen" role="progressbar" aria-label="Loading resume">
          <div className="pixel-loading-bar"><div className="pixel-loading-fill" /></div>
        </div>
      )}
      {popupOpen && (
        <Rnd
          bounds="parent"
          dragHandleClassName="resume-message-titlebar"
          default={{
            x: Math.max(8, Math.min(280, (window.innerWidth - 340) / 2)),
            y: Math.max(8, Math.min(180, (window.innerHeight - 150) / 2)),
            width: 340,
            height: 150,
          }}
          minWidth={260}
          maxWidth={440}
          className="resume-message-window"
        >
          <div className="resume-message-titlebar">
            <strong>System Message</strong>
            <button type="button" aria-label="Close message" onClick={() => setPopupOpen(false)}>×</button>
          </div>
          <div className="resume-message-body" role="status">
            <strong>Please Hire Me</strong>
            <span>im open to design and engineering internship roles</span>
            <button type="button" onClick={() => setPopupOpen(false)}>OK</button>
          </div>
        </Rnd>
      )}
    </div>
  );
}

export default ResumeFile;
