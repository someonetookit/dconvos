import styles from "../../styles/Home/Home.module.css";
import { useLocalStorage } from "../snippets/useLocalStorage";

import SideBar from "../SideBar";
import Gun from "gun";
import { useEffect, useState } from "react";

const gun = Gun({
  peers: ["https://dconvos-relay.glitch.me/gun"],
});

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

  const [txt, setTxt] = useState();

  useEffect(() => {
    gun.get("text").once((node) => {
      console.log(node);
      if (node == undefined) {
        gun.get("text").put({ text: "Write the text here" });
      } else {
        console.log("Found Node");
        setTxt(node.text);
      }
    });

    gun.get("text").on((node) => {
      console.log("Receiving Update");
      console.log(node);
      setTxt(node.text);
    });
  }, []);

  const updateText = (event) => {
    console.log("Updating Text");
    console.log(event.target.value);
    gun.get("text").put({ text: event.target.value }); 
    setTxt(event.target.value);
  };

  return (
    <div className={styles.home} data-theme={theme}>
      <button className={styles.switchTheme} onClick={switchTheme}>
        {theme}
      </button>

      <div className={styles.sideBar}>
        <SideBar active="calls" />
      </div>
      <div className={styles.chats}>
        <div className="App">
          <textarea value={txt} onChange={updateText} />
        </div>
      </div>
      <div className={styles.individual}></div>
    </div>
  );
}
