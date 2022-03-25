import { useEffect,useState } from "react";
import styles from "../../styles/Notification/Notification.module.css";
import { useLocalStorage } from "../snippets/useLocalStorage";

import SideBar from "../SideBar";

export default function Notifications() {
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
  return (
    <div className={styles.notiContainer} data-theme={theme}>
      <div className={styles.sideBar}>
        <SideBar active="notifications" />
      </div>
      <div className={styles.test}></div>
    </div>
  );
}
