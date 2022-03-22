import React from 'react'
import styles from '../../styles/Settings/Settings.module.css';
import HelpIcon from '@mui/icons-material/Help';
import PeopleIcon from '@mui/icons-material/People';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
export  function Helps() {
  function openPrivacy(){
    window.open("#");
  }
  function openHelpCenter(){
    window.open("#");
  }
  function openContactus(){
    window.open("#")
  }
  return (
    <div>
      <div className={styles.helpHeading}>Help</div>
      <div  className={styles.circleLogo}></div>
      <div className={styles.version}>Version v 1.1.0</div>
      <div className={styles.helpOptions}>
        <div className={styles.helpCenter} onClick={openHelpCenter}>
          <div className={styles.icons}><HelpIcon sx={{fontSize:20,color: "var(--accent)"}}/></div>
          <div className={styles.labels}>Help Center</div>
        </div>
        <div className={styles.contactUs } onClick={openContactus}>
          <div className={styles.icons}><PeopleIcon sx={{fontSize:20,color: "var(--accent)"}}/></div>
          <div className={styles.labels}>Contact us</div>
        </div>
        <div className={styles.privacy} onClick={openPrivacy}>
          <div className={styles.icons}><PrivacyTipIcon sx={{fontSize:20,color: "var(--accent)"}}/></div>
          <div className={styles.labels}>Terms and Privacy Policy</div>
        </div>
      </div>
    </div>
  )
}
