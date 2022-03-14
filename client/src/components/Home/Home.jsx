import styles from "../../styles/Home/Home.module.css";
import { useLocalStorage } from "../snippets/useLocalStorage";

import Chats from "./Chats"

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
  return (
    <div className={styles.home} data-theme={theme}>
      <button className={styles.switchTheme} onClick={switchTheme}>{theme}</button>

      <div className={styles.sideBar}></div>
      <div className={styles.chats}>
        <Chats/>
      </div>
      <div className={styles.individual}></div>
    </div>
  );
}
