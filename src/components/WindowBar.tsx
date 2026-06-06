import { List, TaskBar } from "@react95/core";
import {
  Computer3,
  Settings,
  Joy102,
  Inetcpl1313,
  Wordpad,
  Mail
} from "@react95/icons";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";
import Shutdown from "./Shutdown";
import { useWindowsStore } from "../store/windows";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: "0 10px", alignSelf: "center" }}>
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </div>
  );
}

function WindowBar() {
  const [showShutdown, setShowShutdown] = useState(false);
  const { openWindow } = useWindowsStore();
  return (
    <>
      <TaskBar
        list={
          <List width={"200px"}>
            <List.Item icon={<Mail variant="32x32_4" />}>
              <List width={"200px"}>
                <List.Item icon={<FaGithub size={16} />}>
                  <a href="https://github.com/jo-nathan-2306" target="_blank" style={{ textDecoration: 'none', color: '#222', fontFamily: 'W95F, MS Sans Serif, sans-serif' }}>GitHub</a>
                </List.Item>
                <List.Item icon={<FaLinkedin size={16} />}>
                  <a href="https://linkedin.com/in/jonathan-giboy-panicker-2a41ba2b2/" target="_blank" style={{ textDecoration: 'none', color: '#222', fontFamily: 'W95F, MS Sans Serif, sans-serif' }}>LinkedIn</a>
                </List.Item>
                <List.Item icon={<Mail variant="16x16_4" />}>
                  <a href="mailto:jonathangiboy@gmail.com" style={{ textDecoration: 'none', color: '#222', fontFamily: 'W95F, MS Sans Serif, sans-serif' }}>Gmail</a>
                </List.Item>
              </List>
              Contact
            </List.Item>
            <List.Item
              onClick={() => openWindow("Game")}
              icon={<Joy102 variant="32x32_4" />}
            >
              Game
            </List.Item>
            <List.Item icon={<Settings variant="32x32_4" />}>
              Settings
            </List.Item>
            <List.Item
              onClick={() => openWindow("Browser")}
              icon={<Inetcpl1313 variant="32x32_4" />}
            >
              Browser
            </List.Item>
            <List.Item
              onClick={() => openWindow("About Me")}
              icon={<Wordpad variant="32x32_4" />}
            >
              About Me
            </List.Item>
            <List.Divider />
            <List.Item
              onClick={() => setShowShutdown(true)}
              icon={<Computer3 variant="32x32_4" />}
            >
              Shut Down...
            </List.Item>
            
          </List>
        }
      >
        <Clock />
      </TaskBar>
      {showShutdown && <Shutdown close={() => setShowShutdown(false)} />}
    </>
  );
}

export default WindowBar;
