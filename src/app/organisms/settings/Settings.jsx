import React, { useState, useEffect, useRef } from "react";
import styles from "./Settings.module.css";
//import ToggleButton from '@mui/material/ToggleButton';
import PeopleIcon from "@mui/icons-material/People";
//import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
//import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

//import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
//import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
//import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import Slider from "@mui/material/Slider";
//import {useLocalStorage} from '../../hooks/useLocalStorage'

import Switch from "@mui/material/Switch";

import initMatrix from "../../../client/initMatrix";
import cons from "../../../client/state/cons";
import settings from "../../../client/state/settings";
import navigation from "../../../client/state/navigation";
import {
  toggleSystemTheme,
  toggleMarkdown,
  toggleMembershipEvents,
  toggleNickAvatarEvents,
  toggleNotifications,
  toggleNotificationSounds,
} from "../../../client/action/settings";

import { usePermission } from "../../hooks/usePermission";

import Text from "../../atoms/text/Text";
import IconButton from "../../atoms/button/IconButton";
import Button from "../../atoms/button/Button";
//import Toggle from '../../atoms/button/Toggle';
//import Tabs from '../../atoms/tabs/Tabs';
//import { MenuHeader } from '../../atoms/context-menu/ContextMenu';
import SegmentedControls from "../../atoms/segmented-controls/SegmentedControls";

import PopupWindow from "../../molecules/popup-window/PopupWindow";
//import SettingTile from '../../molecules/setting-tile/SettingTile';
import ImportE2ERoomKeys from "../../molecules/import-export-e2e-room-keys/ImportE2ERoomKeys";
import ExportE2ERoomKeys from "../../molecules/import-export-e2e-room-keys/ExportE2ERoomKeys";

import ProfileEditor from "../profile-editor/ProfileEditor";

//-----------switch styling--------------------------//
import { styled } from "@mui/system";
import SwitchUnstyled, {
  switchUnstyledClasses,
} from "@mui/base/SwitchUnstyled";

// --------  important --------------
import DeviceManage from "./DeviceManage";

//import SunIC from '../../../../public/res/ic/outlined/sun.svg';
//import LockIC from '../../../../public/res/ic/outlined/lock.svg';
//import BellIC from '../../../../public/res/ic/outlined/bell.svg';
//import InfoIC from '../../../../public/res/ic/outlined/info.svg';
import PowerIC from "../../../../public/res/ic/outlined/power.svg";
import CrossIC from "../../../../public/res/ic/outlined/cross.svg";

import { PrivacyTip } from "@mui/icons-material";

//-------------switch styles--------------
const blue = {
  500: "#007FFF",
};

const grey = {
  400: "#BFC7CF",
  500: "#AAB4BE",
  600: "#6F7E8C",
};

const Root = styled("span")(
  ({ theme }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: 10px;
  cursor: pointer;


  & .${switchUnstyledClasses.track} {
    background: ${theme.palette.mode === "dark" ? grey[600] : grey[400]};
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 22px;
      top: 3px;
      background-color: #fff;
    }

    .${switchUnstyledClasses.track} {
      background:var(--accent);
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `
);

function AppearanceSection() {
  let previousSize = 13;
  const [, updateState] = useState({});
  const sizeRef = useRef();

  function valuetext(value) {
    document.body.style.fontSize = value + "px";
    localStorage.setItem("fontSize", value);
    return value;
  }
  const switchAccent = (acc) => {
    document.querySelector(":root").style.setProperty("--accent", acc);
    localStorage.setItem("accent", acc);
  };
  const themeSegments = [
    // { text: "Light" },
    // { text: "Silver" },
    { text: "Dark" },
    // { text: "Butter" },
  ];

  return (
    <div className={styles.settingsAppearance}>
      <div className={styles.settingsAppearanceCard}>
        <div className={styles.menuHeader}>
          <Text variant="b3">Theme</Text>
        </div>
        {/* <div className={styles.toggleSettings}>
          <div className={styles.titleAndContent}>
            <div>
              <Text variant="b1">Follow system Theme</Text>
            </div>
            <div>
              <Text variant="b3">
                Use light or dark mode based on the system settings.
              </Text>
            </div>
          </div>
          <div className={styles.toggleButton}>
            <SwitchUnstyled
              component={Root}
              checked={settings.useSystemTheme}
              onChange={() => {
                toggleSystemTheme();
                updateState({});
              }}
            />
          </div>
        </div> */}

        {!settings.useSystemTheme && (
          <div>
            <div className={styles.darkThemeSelect}>
              <SegmentedControls
                selected={settings.getThemeIndex()}
                segments={[
                  // { text: "Light" },
                  // { text: "Silver" },
                  { text: "Dark" },
                  // { text: "Butter"},
                ]}
                onSelect={(index) => settings.setTheme(index)}
              />
              <p className={styles.comingSoon}>more themes coming soon</p>
            </div>
          </div>
        )}
      </div>
      <div className={styles.settingsAppearanceCard}>
        <div className={styles.menuHeader}>
          <Text variant="b3">Font size</Text>
        </div>
        <div className={styles.sliderMain}>
          <div className={styles.slider}>
            <Slider
              defaultValue={13 || localStorage.getItem("fontSize")}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={12}
              max={20}
              sx={{ color: "var(--accent)" }}
            />
          </div>
        </div>
      </div>
      <div className={styles.settingsAppearanceCard}>
        <div className={styles.menuHeader}>
          <Text variant="b3">Accent</Text>
        </div>
        <div className={styles.colorContainer}>
          <div
            className={styles.colorSelect}
            style={{ backgroundColor: "#00e5ff" }}
            onClick={() => {
              switchAccent("#00e5ff");
            }}
          />
          <div
            className={styles.colorSelect}
            style={{ backgroundColor: "#00e576" }}
            onClick={() => {
              switchAccent("#00e576");
            }}
          />
          <div
            className={styles.colorSelect}
            style={{ backgroundColor: "#ffea00" }}
            onClick={() => {
              switchAccent("#ffea00");
            }}
          />
          <div
            className={styles.colorSelect}
            style={{ backgroundColor: "#e51efe" }}
            onClick={() => {
              switchAccent("#e51efe");
            }}
          />
          <div
            className={styles.colorSelect}
            style={{ backgroundColor: "#f40057" }}
            onClick={() => {
              switchAccent("#f40057");
            }}
          />
        </div>
      </div>

      <div className={styles.settingsAppearanceCard}>
        <div className={styles.menuHeader}>
          <Text variant="b3">Room messages</Text>
        </div>
        <div className={styles.optionContainer}>
          <div className={styles.toggleSettings}>
            <div className={styles.titleAndContent}>
              <div>
                <Text variant="b1">Markdown formatting</Text>
              </div>
              <div>
                <Text variant="b3">
                  Format messages with markdown syntax before sending.
                </Text>
              </div>
            </div>
            <div className={styles.toggleButton}>
              <SwitchUnstyled
                component={Root}
                checked={settings.isMarkdown}
                onChange={() => {
                  toggleMarkdown();
                  updateState({});
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.optionContainer}>
          <div className={styles.toggleSettings}>
            <div className={styles.titleAndContent}>
              <div>
                <Text variant="b1">Hide membership events</Text>
              </div>
              <div>
                <Text variant="b3">
                  Hide membership change messages from room timeline. (Join,
                  Leave, Invite, Kick and Ban)
                </Text>
              </div>
            </div>
            <div className={styles.toggleButton}>
              <SwitchUnstyled
                component={Root}
                checked={settings.hideMembershipEvents}
                onChange={() => {
                  toggleMembershipEvents();
                  updateState({});
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.optionContainer}>
          <div className={styles.toggleSettings}>
            <div className={styles.titleAndContent}>
              <div>
                <Text variant="b1">Hide nick/avatar events</Text>
              </div>
              <div>
                <Text variant="b3">
                  Hide nick and avatar change messages from chat timeline.
                </Text>
              </div>
            </div>
            <div className={styles.toggleButton}>
              <SwitchUnstyled
                component={Root}
                checked={settings.hideNickAvatarEvents}
                onChange={() => {
                  toggleNickAvatarEvents();
                  updateState({});
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationsSection() {
  const [permission, setPermission] = usePermission(
    "notifications",
    window.Notification?.permission
  );

  const [, updateState] = useState({});

  const renderOptions = () => {
    if (window.Notification === undefined) {
      return (
        <Text className="settings-notifications__not-supported">
          Not supported in this browser.
        </Text>
      );
    }

    if (permission === "granted") {
      return (
        <SwitchUnstyled
          component={Root}
          checked={settings._showNotifications}
          onChange={() => {
            toggleNotifications();
            setPermission(window.Notification?.permission);
            updateState({});
          }}
        />
      );
    }

    return (
      <Button
        variant="primary"
        onClick={() =>
          window.Notification.requestPermission().then(setPermission)
        }
      >
        Request permission
      </Button>
    );
  };

  return (
    <div className={styles.settingsNotifications}>
      <div className={styles.menuHeader}>
        <Text variant="b3">Notification &amp; Sound</Text>
      </div>

      <div className={styles.optionContainer}>
        <div className={styles.toggleSettings}>
          <div className={styles.titleAndContent}>
            <div>
              <Text variant="b1">Desktop notification</Text>
            </div>
            <div>
              <Text variant="b3">
                Show desktop notification when new messages arrive.
              </Text>
            </div>
          </div>
          <div className={styles.toggleButton}>{renderOptions()}</div>
        </div>
      </div>
      <div className={styles.optionContainer}>
        <div className={styles.toggleSettings}>
          <div className={styles.titleAndContent}>
            <div>
              <Text variant="b1">Notification Sound</Text>
            </div>
            <div>
              <Text variant="b3">Play sound when new messages arrive.</Text>
            </div>
          </div>
          <div className={styles.toggleButton}>
            <SwitchUnstyled
              component={Root}
              checked={settings.isNotificationSounds}
              onChange={() => {
                toggleNotificationSounds();
                updateState({});
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SecuritySection() {
  return (
    <div>
      <div className={styles.settingsSecurityCard}>
        <div className={styles.menuHeader}>
          <Text variant="b3">Session Info</Text>
        </div>
        <div className={styles.optionContainer}>
          <div className={styles.toggleSettings}>
            <div className={styles.titleAndContent}>
              <div>
                <Text variant="b1">{`Session ID: ${initMatrix.matrixClient.getDeviceId()}`}</Text>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.optionContainer}>
          <div className={styles.toggleSettings}>
            <div className={styles.titleAndContent}>
              <div>
                <Text variant="b1">{`Session key: ${initMatrix.matrixClient
                  .getDeviceEd25519Key()
                  .match(/.{1,4}/g)
                  .join(" ")}`}</Text>
              </div>
              <div>
                <Text variant="b3">
                  Use this session ID-key combo to verify or manage this
                  session.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.settingsSecurityCard}>
        <DeviceManage />
      </div>
      <div className={styles.settingsSecurityCard}>
        <div className={styles.menuHeader}>
          <Text variant="b3">Encryption</Text>
        </div>
        <div className={styles.optionContainer}>
          <div className={styles.toggleSettings}>
            <div className={styles.titleAndContent}>
              <div>
                <Text variant="b1">Export E2E room keys</Text>
              </div>
              <div>
                <Text variant="b3">
                  Export end-to-end encryption chat room keys to decrypt old
                  messages in other session. In order to encrypt keys you need
                  to set a password, which will be used while importing.
                </Text>
              </div>
              <div>
                <ExportE2ERoomKeys />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.optionContainer}>
          <div className={styles.toggleSettings}>
            <div className={styles.titleAndContent}>
              <div>
                <Text variant="b1">Import E2E room keys</Text>
              </div>
              <div>
                <Text variant="b3">
                  {
                    "To decrypt older messages, Export E2EE room keys from Element (Settings > Security & Privacy > Encryption > Cryptography) and import them here. Imported keys are encrypted so you'll have to enter the password you set in order to decrypt it."
                  }
                </Text>
              </div>
              <div>
                <ImportE2ERoomKeys />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HelpSection() {
  return (
    <div>
      <div className={styles.helpContainer}>
        <div className={styles.circleGif}></div>
        <div className={styles.versionInfo}>
          <Text variant="b3">Version 1.0.0</Text>
        </div>
        <div className={styles.settingsAppearanceCard}>
          <div className={styles.helpOptionsContainer}>
            <div className={styles.helpOptions}>
              <div className={styles.helpsIcons}>
                <HelpCenterIcon sx={{ fontSize: 18, color: "var(--accent)" }} />
              </div>
              <div className={styles.helpCenter}>
                <Text>Help center</Text>
              </div>
            </div>
            <div className={styles.helpOptions}>
              <div className={styles.helpsIcons}>
                <PeopleIcon sx={{ fontSize: 18, color: "var(--accent)" }} />
              </div>
              <div className={styles.helpContact}>
                <Text>Contact us</Text>
              </div>
            </div>
            <div className={styles.helpOptions}>
              <div className={styles.helpsIcons}>
                <PrivacyTip sx={{ fontSize: 18, color: "var(--accent)" }} />
              </div>
              <div className={styles.HelpTerms}>
                <Text>Terms and Privacy Policy</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function useWindowToggle() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const openSettings = () => {
      setIsOpen(true);
    };
    navigation.on(cons.events.navigation.SETTINGS_OPENED, openSettings);
    return () => {
      navigation.removeListener(
        cons.events.navigation.SETTINGS_OPENED,
        openSettings
      );
    };
  }, []);

  const requestClose = () => setIsOpen(false);

  return [isOpen, requestClose];
}

function Settings() {
  const [settingsTab, setSettingsTab] = useState(<AppearanceSection />);
  const [activeTab, setActiveTab] = useState("settingsGeneralTab");
  //const [selectedTab, setSelectedTab] = useState(tabItems[0]);
  const [isOpen, requestClose] = useWindowToggle(/*setSelectedTab*/);

  // const handleTabChange = (tabItem) => setSelectedTab(tabItem);
 // const handleLogout = () => {
 //   if (confirm("Confirm logout")) logout();
 // };

  function changeTab(string) {
    switch (string) {
      case "general":
        setSettingsTab(<AppearanceSection />);
        break;
      case "notification":
        setSettingsTab(<NotificationsSection />);
        break;
      case "security":
        setSettingsTab(<SecuritySection />);
        break;
      case "help":
        setSettingsTab(<HelpSection />);
        break;

      default:
        break;
    }
  }

  return (
    <PopupWindow
      isOpen={isOpen}
      className={styles.settingsWindow}
      title={
        <Text variant="s1" weight="medium" primary>
          Settings
        </Text>
      }
      contentOptions={
        <>
          {/* <Button variant="danger" iconSrc={PowerIC} onClick={handleLogout}>
            Logout
          </Button> */}

          <IconButton src={CrossIC} onClick={requestClose} tooltip="Close" />
        </>
      }
      onRequestClose={requestClose}
    >
      {isOpen && (
        <div className={styles.settingsWindowContent}>
          <div className={styles.profileEditor}>
            <ProfileEditor userId={initMatrix.matrixClient.getUserId()} />
          </div>
          <div className={styles.settingsOptions}>
            <div
              onClick={() => changeTab("general")}
              tabIndex="0"
              className={styles.settingsGeneralTab}
            >
              <Text>General</Text>
            </div>
            <div
              onClick={() => changeTab("notification")}
              tabIndex="-1"
              className={styles.settingsNotificationTab}
            >
              <Text>Notifications</Text>
            </div>
            <div
              onClick={() => changeTab("security")}
              tabIndex="-1"
              className={styles.settingsSecurityTab}
            >
              <Text>Security &amp; Privacy</Text>
            </div>
            <div
              onClick={() => changeTab("help")}
              tabIndex="-1"
              className={styles.settingsHelpTab}
            >
              <Text>Help</Text>
            </div>
          </div>
          <div className={styles.tabContent}>{settingsTab}</div>
        </div>
      )}
    </PopupWindow>
  );
}

export default Settings;
/*

 <Button variant="danger" iconSrc={PowerIC} onClick={handleLogout}>
            Logout
          </Button>

*/

/*
<Tabs
            items={tabItems}
            defaultSelected={tabItems.findIndex((tab) => tab.text === selectedTab.text)}
            onSelect={handleTabChange}
          />
          <div className="settings-window__cards-wrapper">
            { selectedTab.render() }
          </div>

*/

/* useEffect item


    const tabItem = tabItems.find((item) => item.text === tab);
      if (tabItem) setSelectedTab(tabItem);
*/
