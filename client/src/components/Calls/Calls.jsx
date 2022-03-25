import styles from "../../styles/Home/Home.module.css";
import { useLocalStorage } from "../snippets/useLocalStorage";

import SideBar from "../SideBar";

export default function Calls() {
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
        <SideBar active="calls"/>
      </div>
      <div className={styles.chats}>
      </div>
      <div className={styles.individual}></div>
    </div>
  );
}
