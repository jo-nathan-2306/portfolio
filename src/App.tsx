import WindowBar from "./components/WindowBar";
import DesktopIcon from "./components/DesktopIcon";
import Contact from "./components/Contact";
import { Joy102, Mail, Folder, FolderFile, Computer, Shell322 } from "@react95/icons";
import Resume from "./components/Resume";
import Game from "./components/Game";
import wallpaper from "./assets/wallpaper.jpg";
// Notepad removed from desktop
import FileExp from "./components/FileExp";
import { CdMusic } from "@react95/icons";
import CdPlayer from "./components/CdPlayer";
import Doom from "./components/Doom";
import Portfolio from "./components/Portfolio";
import ResumeFile from "./components/ResumeFile";
import { DoomIcon, PortfolioIcon } from "./components/AppIcons";


function App() {
  return (
    <div className="desktop-shell" style={{ backgroundImage: `url(${wallpaper})` }}>
      <WindowBar />
      <div className="desktop-icons">
        <div className="desktop-icon-group">
          <DesktopIcon width={900} height={640} icon={<Shell322 variant="32x32_4"/>} name="Resume">
            <ResumeFile />
          </DesktopIcon>
          <DesktopIcon width={900} height={640} icon={<PortfolioIcon variant="32x32_4"/>} name="Portfolio">
            <Portfolio />
          </DesktopIcon>
          <DesktopIcon width={500} height={480} icon={<Folder variant="32x32_4"/>} name="Projects">
            <FileExp initialPath="Documents/Projects" />
          </DesktopIcon>
          <DesktopIcon width={650} icon={<Computer variant="32x32_4"/>} name="About Me">
            <Resume />
          </DesktopIcon>
          <DesktopIcon width={400} icon={<Mail variant="32x32_4"/>} name="Contact Me">
            <Contact />
          </DesktopIcon>

          <DesktopIcon width={480} height={120} icon={<CdMusic variant="32x32_4"/>} name="CD Player">
            <CdPlayer />
          </DesktopIcon>
          <DesktopIcon width={400} height={400} icon={<Joy102 variant="32x32_4"/>} name="Chess">
            <Game />
          </DesktopIcon>
          <DesktopIcon width={960} height={600} icon={<DoomIcon variant="32x32_4"/>} name="DOOM">
            <Doom />
          </DesktopIcon>
          <DesktopIcon width={700} height={480} icon={<FolderFile variant="32x32_4"/>} name="File Explorer">
            <FileExp />
          </DesktopIcon>
        </div>
      </div>
    </div>
  );
}

export default App;
