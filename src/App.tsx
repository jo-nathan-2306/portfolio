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


function App() {
  return (
    <div style={{ width: "100%", backgroundImage: `url(${wallpaper})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh", position: "relative" }}>
      <div className="fixed" style={{ display: "grid", gridAutoFlow: "column", gridTemplateRows: "repeat(7, max-content)", rowGap: "8px", columnGap: "12px", padding: "8px 10px" }}>
        <DesktopIcon width={480} height={120} icon={<CdMusic variant="32x32_4"/>} name="CD Player">
          <CdPlayer />
        </DesktopIcon>
        <DesktopIcon icon={<Inetcpl1313 variant="32x32_4"/>} name="Browser">
          <iframe width={800} height={500} src="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1" />
        </DesktopIcon>
        <DesktopIcon width={650} icon={<Computer variant="32x32_4"/>} name="About Me">
          <Resume />
        </DesktopIcon>
        <DesktopIcon width={400} height={400} icon={<Joy102 variant="32x32_4"/>} name="Game">
          <Game />
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
      <WindowBar />
    </div>
  );
}

export default App;
