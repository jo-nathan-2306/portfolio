import WindowBar from "./components/WindowBar";
import DesktopIcon from "./components/DesktopIcon";
import Contact from "./components/Contact";
import { Inetcpl1313, Joy102, Mail, Folder, FolderFile, Computer } from "@react95/icons";
import Resume from "./components/Resume";
import Game from "./components/Game";
import wallpaper from "./assets/wallpaper.jpg";
// Notepad removed from desktop
import FileExp from "./components/FileExp";
import { CdMusic } from "@react95/icons";
import CdPlayer from "./components/CdPlayer";
import Doom from "./components/Doom";
import Portfolio from "./components/Portfolio";
import { DoomIcon, PortfolioIcon } from "./components/AppIcons";


function App() {
  return (
    <div className="desktop-shell" style={{ backgroundImage: `url(${wallpaper})` }}>
      <WindowBar />
      <div className="desktop-icons">
        <DesktopIcon width={480} height={120} icon={<CdMusic variant="32x32_4"/>} name="CD Player">
          <CdPlayer />
        </DesktopIcon>
        <DesktopIcon icon={<Inetcpl1313 variant="32x32_4"/>} name="Browser">
          <iframe width={800} height={500} src="https://duckduckgo.com" />
        </DesktopIcon>
        <DesktopIcon width={650} icon={<Computer variant="32x32_4"/>} name="About Me">
          <Resume />
        </DesktopIcon>
        <DesktopIcon width={900} height={640} icon={<PortfolioIcon variant="32x32_4"/>} name="Portfolio">
          <Portfolio />
        </DesktopIcon>
        <DesktopIcon width={400} height={400} icon={<Joy102 variant="32x32_4"/>} name="Game">
          <Game />
        </DesktopIcon>
        <DesktopIcon width={960} height={600} icon={<DoomIcon variant="32x32_4"/>} name="DOOM">
          <Doom />
        </DesktopIcon>
        <DesktopIcon width={400} icon={<Mail variant="32x32_4"/>} name="Contact">
          <Contact />
        </DesktopIcon>
        <DesktopIcon width={700} height={480} icon={<FolderFile variant="32x32_4"/>} name="File Explorer">
          <FileExp />
        </DesktopIcon>
        <DesktopIcon width={500} height={480} icon={<Folder variant="32x32_4"/>} name="Projects">
          <FileExp initialPath="Documents/Projects" />
        </DesktopIcon>
      </div>
    </div>
  );
}

export default App;
