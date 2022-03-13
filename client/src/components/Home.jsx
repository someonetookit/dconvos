import styles from "../styles/Home.module.css";
import { useLocalStorage } from "./snippets/useLocalStorage";

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
      <button onClick={switchTheme}>{theme}</button>
    </div>
  );
}
