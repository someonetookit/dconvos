import { useEffect,useState } from "react";
import styles from "../../styles/Home/Home.module.css";
import { useLocalStorage } from "../snippets/useLocalStorage";

import SideBar from "../SideBar";

export default function Favorites() {
  const [accent, setAccent] = useState("");

  useEffect(() => {
    const acc = localStorage.getItem("accent");
    setAccent(acc);
    document.querySelector(":root").style.setProperty("--accent", acc);
  }, []);
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  return (
    <div className={styles.home} data-theme={theme}>
      <div className={styles.sideBar}>
        <SideBar active="favorites"/>
      </div>
      <div className={styles.chats}>
      </div>
      <div className={styles.individual}></div>
    </div>
  );
}
