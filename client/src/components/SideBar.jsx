import styles from "../styles/SideBar.module.css";

import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export default function SideBar() {
  return (
    <>
      <div className={styles.container}>
        <MailOutlineOutlinedIcon sx={{ fontSize: 25 }} />
        <LocalPhoneOutlinedIcon sx={{ fontSize: 25 }} />
        <NotificationsNoneOutlinedIcon sx={{ fontSize: 25 }} />
        <FavoriteBorderOutlinedIcon sx={{ fontSize: 25 }} />
      </div>
      <div className={styles.settings}>
        <SettingsOutlinedIcon sx={{ fontSize: 25 }} />
        <div className={styles.avatar}>hi</div>
      </div>
    </>
  );
}
