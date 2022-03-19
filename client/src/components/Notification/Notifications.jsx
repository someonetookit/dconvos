import styles from "../../styles/Notification/Notification.module.css";
import { useLocalStorage } from "../snippets/useLocalStorage";

import SideBar from "../SideBar";

export default function Notifications() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const switchAccent = (acc) => {
    document.querySelector(":root").style.setProperty("--accent", acc);
    localStorage.setItem("accent",acc)
  };
  return (
    <div className={styles.notiContainer} data-theme={theme}>
      <div className={styles.sideBar}>
        <SideBar active="notifications" />
      </div>
      <div className={styles.test}>
        <div
          className={styles.colorSelect}
          style={{ backgroundColor: "#00e5ff" }}
          onClick={() => {
            switchAccent("#00e5ff");
          }}
        ></div>
        <div
          className={styles.colorSelect}
          style={{ backgroundColor: "#00e576" }}
          onClick={() => {
            switchAccent("#00e576");
          }}
        ></div>
        <div
          className={styles.colorSelect}
          style={{ backgroundColor: "#ffea00" }}
          onClick={() => {
            switchAccent("#ffea00");
          }}
        ></div>
        <div
          className={styles.colorSelect}
          style={{ backgroundColor: "#e51efe" }}
          onClick={() => {
            switchAccent("#e51efe");
          }}
        ></div>
        <div
          className={styles.colorSelect}
          style={{ backgroundColor: "#f40057" }}
          onClick={() => {
            switchAccent("#f40057");
          }}
        ></div>
      </div>
    </div>
  );
}
