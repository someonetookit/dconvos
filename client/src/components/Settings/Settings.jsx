import React, { useReducer, useState, useEffect } from "react";
import styles from "../../styles/Settings/Settings.module.css";
import { useLocalStorage } from "../snippets/useLocalStorage";
import SideBar from "../SideBar";
import { General } from "./General";
import { AccountAndPrivacy } from "./AccountAndPrivacy";
import { Helps } from "./Helps";
import { Notification } from "./Notification";

export default function Settings() {
  const [state, dispach] = useReducer(reducer, { menu: General });
  const [accent, setAccent] = useState("");

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  useEffect(() => {
    const acc = localStorage.getItem("accent");
    setAccent(acc);
    document.querySelector(":root").style.setProperty("--accent", acc);
  }, [setTheme]);
  function changeTheme(newTheme) {
    setTheme(newTheme);
  }
  function reducer(state, action) {
    switch (action.type) {
      case "addGeneral":
        return { menu: General };
      case "addProfile":
        return { menu: AccountAndPrivacy };
      case "addNotification":
        return { menu: Notification };
      case "addHelp":
        return { menu: Helps };
      default:
        return { menu: General };
    }
  }
  function addGeneral() {
    dispach({ type: "addGeneral" });
  }
  function addProfile() {
    dispach({ type: "addProfile" });
  }

  function addNotification() {
    dispach({ type: "addNotification" });
  }
  function addHelp() {
    dispach({ type: "addHelp" });
  }

  return (
    <div className={styles.settings} data-theme={theme}>
      <div className={styles.sideBar}>
        <SideBar active="settings" />
      </div>
      <div className={styles.settingsContainer}>
        <div className={styles.head}>
          <div className={styles.settingsHeadingPart}>Settings</div>
        </div>
        <div className={styles.settingsOptions}>
          <div className={styles.optionStyle} onClick={addGeneral}>
            General
          </div>
          <div className={styles.optionStyle} onClick={addProfile}>
            Account & Privacy
          </div>
          <div className={styles.optionStyle} onClick={addNotification}>
            Notification
          </div>
          <div className={styles.optionStyle} onClick={addHelp}>
            Help
          </div>
        </div>
        <div className={styles.menuContainerBox}>
          <div className={styles.menuContainer} id="menuContainer">
            <state.menu />
            {state.menu == General && (
              <div className={styles.backgroundTheme}>
                <div className={styles.background}>Theme</div>
                <div
                  className={styles.darkModeContainer}
                  id="darkModeContainer"
                >
                  <div
                    className={styles.light}
                    id="light"
                    onClick={() => changeTheme("light")}
                  >
                    Light
                  </div>
                  <div
                    className={styles.dark}
                    id="dark"
                    onClick={() => changeTheme("dark")}
                  >
                    Dark
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.individual} />
    </div>
  );
}
