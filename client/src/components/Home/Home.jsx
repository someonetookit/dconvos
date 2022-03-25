import styles from "../../styles/Home/Home.module.css";
import { useLocalStorage } from "../snippets/useLocalStorage";
import { useEffect } from "react";

import Chats from "./Chats";
import SideBar from "../SideBar";

export default function Home() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  useEffect(() => {
    const acc = localStorage.getItem("accent");
    document.querySelector(":root").style.setProperty("--accent", acc);
  });
  return (
    <div className={styles.home} data-theme={theme}>
      <div className={styles.sideBar}>
        <SideBar active="home" />
      </div>
      <div className={styles.chats}>
        <Chats />
      </div>
      <div className={styles.individual}></div>
    </div>
  );
}
