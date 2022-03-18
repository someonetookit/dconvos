import styles from "../styles/SideBar.module.css";
import { useNavigate } from "react-router-dom";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EmailIcon from "@mui/icons-material/Email";

import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export default function SideBar(props) {
  const navigate = useNavigate();
  function goTo(rou) {
    // console.log(rou);
    navigate("/" + rou);
  }
  return (
    <>
      <div className={styles.container}>
        <div
          onClick={() => {
            goTo("");
          }}
        >
          {props.active == "home" ? (
            <EmailIcon sx={{ fontSize: 25, color: "var(--accent)" }} />
          ) : (
            <EmailOutlinedIcon sx={{ fontSize: 25 }} />
          )}
        </div>
        <div
          onClick={() => {
            goTo("calls");
          }}
        >
          {props.active == "calls" ? (
            <LocalPhoneIcon sx={{ fontSize: 25, color: "var(--accent)" }} />
          ) : (
            <LocalPhoneOutlinedIcon sx={{ fontSize: 25 }} />
          )}
        </div>
        <div
          onClick={() => {
            goTo("notifications");
          }}
        >
          {props.active == "notifications" ? (
            <NotificationsIcon sx={{ fontSize: 25, color: "var(--accent)" }} />
          ) : (
            <NotificationsNoneOutlinedIcon sx={{ fontSize: 25 }} />
          )}
        </div>
        <div
          onClick={() => {
            goTo("favorites");
          }}
        >
          {props.active == "favorites" ? (
            <FavoriteIcon sx={{ fontSize: 25, color: "var(--accent)" }} />
          ) : (
            <FavoriteBorderOutlinedIcon sx={{ fontSize: 25 }} />
          )}
        </div>
      </div>
      <div className={styles.settings}>
        <div>
          <SettingsOutlinedIcon sx={{ fontSize: 25 }} />
        </div>
        <div className={styles.avatar}>hi</div>
      </div>
    </>
  );
}
