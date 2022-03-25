import { useEffect,useState } from "react";
import styles from "../../styles/Home/Home.module.css";
import { useLocalStorage } from "../snippets/useLocalStorage";

import SideBar from "../SideBar";
import Gun from "gun";

const gun = Gun({
  peers: ["https://dconvos-relay.herokuapp.com/gun"],
});

export default function Calls() {
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
