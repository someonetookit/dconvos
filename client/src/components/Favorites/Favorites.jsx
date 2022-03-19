import styles from "../../styles/Home/Home.module.css";
import { useLocalStorage } from "../snippets/useLocalStorage";

import SideBar from "../SideBar";

export default function Favorites() {
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
      <button className={styles.switchTheme} onClick={switchTheme}>{theme}</button>

      <div className={styles.sideBar}>
        <SideBar active="favorites"/>
      </div>
      <div className={styles.chats}>
      </div>
      <div className={styles.individual}></div>
    </div>
  );
}
