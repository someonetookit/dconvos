import React from "react";
// import './Welcome.scss';
import styles from "./Welcome.module.css";

import Text from "../../atoms/text/Text";

import dSvg from "../../../../public/res/svg/d.svg";

function Welcome() {
  return (
    <div className={styles.container}>
      <div>
        <img className={styles.logo} src={dSvg} alt="dConvos logo" />
        <p>
          all of your chats are e2e encrypted by default, even groups! <br />
        </p>
      </div>
    </div>
  );
}

export default Welcome;
